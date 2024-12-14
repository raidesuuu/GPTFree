"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaRegCommentDots, FaRobot, FaPlus, FaTrash } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { SiClaude, SiGooglegemini } from "react-icons/si";
import { TbBrandOpenai } from "react-icons/tb";
import { BsArrowDown } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import AnimatedGradientText from "@components/ui/animated-gradient-text";
import { cn } from "@lib/utils";
import { RaiLink } from "@/components/RaiLink";

const ChatApp: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatSessions, setChatSessions] = useState<{
    [key: string]: { name: string; messages: string[] };
  }>({});
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [model, setModel] = useState("gpt-4o");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownUserOpen, setIsDropdownUserOpen] = useState(false);
  const [error] = useState<string | null>(null); // エラー状態の追加
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // 設定ダイアログの状態管理

  const [username, setUsername] = useState<string | null>(null);
  const [isFitPreferred, setIsFitPreferred] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState<string | undefined>(
    undefined
  );

  const [pastedImage, setPastedImage] = useState<string | null>(null);

  const modelDescriptions: {
    [key: string]: {
      description: string;
      displayName?: string;
      outdated?: boolean;
      type: "ChatGPT" | "Gemini" | "Claude" | "Grok";
    };
  } = {
    "gpt-4o": {
      description: "ほとんどのタスクに最適です",
      displayName: "GPT-4o",
      type: "ChatGPT",
    },
    "gpt-4o-2024-08-06": {
      description: "ほとんどのタスクに最適です",
      displayName: "GPT-4o (2024-08-06)",
      type: "ChatGPT",
    },
    "o1-preview": {
      description: "高度な推論を使用する",
      displayName: "o1-preview",
      type: "ChatGPT",
    },
    "o1-mini": {
      description: "推論がスピードアップ",
      displayName: "o1-mini",
      type: "ChatGPT",
    },
    "gpt-4o-mini": {
      description: "日常の作業を効率化",
      displayName: "GPT-4o mini",
      type: "ChatGPT",
    },
    "gpt-4-turbo-2024-04-09": {
      description: "レガシーモデル",
      displayName: "GPT-4",
      outdated: true,
      type: "ChatGPT",
    },
    "gemini-1.5-pro-exp-0827": {
      description: "幅広いタスクに対応する最高のモデル",
      displayName: "1.5 Pro",
      type: "Gemini",
    },
    "gemini-1.5-flash-exp-0827": {
      description: "軽量モデル、スピードと効率を最適化",
      displayName: "1.5 Flash",
      type: "Gemini",
    },
    "claude-3-5-sonnet-20240620": {
      description: "最も賢いAIモデル",
      displayName: "3.5 Sonnet",
      type: "Claude",
    },
    "grok-2": {
      description: "ユーモア溢れるAIアシスタント",
      displayName: "Grok 2",
      type: "Grok",
    },
    "grok-2-mini": {
      description: "速度と品質のバランス",
      displayName: "Grok 2 mini",
      type: "Grok",
    },
    "grok-beta": {
      description: "Grok のベータモデル",
      displayName: "Grok Beta",
      type: "Grok",
    },
    "claude-3-opus": {
      description: "Claude 3 Opus（レガシーモデル）",
      displayName: "3 Opus",
      type: "Claude",
      outdated: true,
    },
    "claude-3-sonnet": {
      description: "Claude 3 Sonnet（レガシーモデル）",
      displayName: "3 Sonnet",
      type: "Claude",
      outdated: true,
    },
    "claude-3-haiku": {
      description: "Claude 3 Haiku（レガシーモデル）",
      displayName: "3 Haiku",
      type: "Claude",
      outdated: true,
    },
    "claude-3-opus-20240229-aws": {
      description: "Claude 3 Opus（レガシーモデル） (AWS)",
      displayName: "3 Opus (AWS)",
      type: "Claude",
      outdated: true,
    },
    "claude-3-opus-20240229-gcp": {
      description: "Claude 3 Opus（レガシーモデル） (GCP)",
      displayName: "3 Opus (GCP)",
      type: "Claude",
      outdated: true,
    },
    "claude-2.1": {
      description: "Claude 2.1（レガシーモデル）",
      displayName: "2.1",
      type: "Claude",
      outdated: true,
    },
  };

  const handleModelChange = (newModel: string) => {
    setModel(newModel);
    setIsDropdownOpen(false);
  };

  const handleSaveSettings = () => {
    // 設定を保存
    if (typeof window !== "undefined") {
      if (username) {
        window.localStorage.setItem("username", username);
      }
      window.localStorage.setItem("credit", "10000");
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = window.localStorage.getItem("username");
      setUsername(storedUsername);

      const savedSessions = localStorage.getItem("chatSessions");
      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions);
        setChatSessions(parsedSessions);
        setActiveSession(Object.keys(parsedSessions)[0] || null);
      } else {
        handleNewSession();
      }

      const handleResize = () => {
        const contentHeight = document.body.scrollHeight; // コンテンツ全体の高さ
        const windowHeight = window.innerHeight; // ビューポートの高さ
        setIsFitPreferred(contentHeight > windowHeight); // h-fit を使いたい条件
      };

      // 初期化とイベントリスナーの設定
      handleResize();
      window.addEventListener("resize", handleResize);

      // クリーンアップ
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const saveSessionsToLocalStorage = (sessions: {
    [key: string]: { name: string; messages: string[] };
  }) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatSessions", JSON.stringify(sessions));
    }
  };

  const handleNewSession = async () => {
    try {
      const newSessionId = `session-${Date.now()}`;
      const newSessionName = `会話 ${Object.keys(chatSessions).length + 1}`;
      const newSessions = {
        ...chatSessions,
        [newSessionId]: { name: newSessionName, messages: [] },
      };
      setChatSessions(newSessions);
      setActiveSession(newSessionId);
      saveSessionsToLocalStorage(newSessions);
    } catch (error) {
      console.error("Error generating session:", error);
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    const { [sessionId]: _, ...remainingSessions } = chatSessions; // eslint-disable-line
    setChatSessions(remainingSessions);
    setActiveSession(Object.keys(remainingSessions)[0] || null);
    saveSessionsToLocalStorage(remainingSessions);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "" && !pastedImage) return;
    if (!activeSession) return;

    const cachedMessage = message;
    setMessage("");

    const newMessage = cachedMessage || "(Image message)";

    setChatSessions((prevSessions) => {
      const updatedSession = [
        ...prevSessions[activeSession].messages,
        newMessage,
      ];
      const updatedSessions = {
        ...prevSessions,
        [activeSession]: {
          ...prevSessions[activeSession],
          messages: updatedSession,
        },
      };
      saveSessionsToLocalStorage(updatedSessions);
      return updatedSessions;
    });

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const bodyContent: any = {
        model,
        messages: [
          ...(model.includes("o1")
            ? []
            : [
                {
                  role: "system",
                  content: systemPrompt
                    ? systemPrompt + " 最初には簡単なタイトルをつけてください。"
                    : "最初には簡単なタイトルをつけてください。",
                },
              ]),
          ...chatSessions[activeSession].messages.map((msg) => {
            if (msg.startsWith("AI:")) {
              return {
                role: "assistant",
                content: [{ type: "text", text: msg.substring(3) }],
              };
            } else {
              return {
                role: "user",
                content: [{ type: "text", text: msg }],
              };
            }
          }),
          {
            role: "user",
            content: [{ type: "text", text: message }],
          },
        ],
      };

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      });

      if (response.ok) {
        const responseData = await response.json();
        const aiMessage =
          responseData.choices[0]?.message.content ||
          "AI: エラーが発生しました。";
        const titleMatch = aiMessage.match(/^(.+?)(?:\n|$)/);
        const title = titleMatch ? titleMatch[1] : "新しいチャット";

        setChatSessions((prevSessions) => {
          if (!activeSession || !prevSessions[activeSession]) {
            console.error("Active session is invalid or undefined.");
            return prevSessions;
          }

          const updatedSession = [
            ...prevSessions[activeSession].messages,
            `AI: ${aiMessage}`,
          ];
          const updatedSessions = {
            ...prevSessions,
            [activeSession]: {
              ...prevSessions[activeSession],
              messages: updatedSession,
              name: prevSessions[activeSession].name.includes("会話")
                ? prevSessions[activeSession].name
                : title.replace(/\[.*?\]\s*|#/g, ""),
            },
          };
          saveSessionsToLocalStorage(updatedSessions);
          return updatedSessions;
        });
      } else {
        setChatSessions((prevSessions) => {
          if (!activeSession || !prevSessions[activeSession]) {
            console.error("Active session is invalid or undefined.");
            return prevSessions;
          }

          const updatedSession = [
            ...prevSessions[activeSession].messages,
            `AI: ### エラーが発生しました。APIサーバーがダウンしているか、このモデルは現在オフラインです。`,
          ];
          const updatedSessions = {
            ...prevSessions,
            [activeSession]: {
              ...prevSessions[activeSession],
              messages: updatedSession,
            },
          };
          saveSessionsToLocalStorage(updatedSessions);
          return updatedSessions;
        });
        console.error("Error sending message to server");
      }

      setPastedImage(null); // Reset the pasted image after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Enterキーのみで送信;
      event.preventDefault(); // 改行を防ぐ
      handleSendMessage();
    } else if (event.key === "Enter" && event.shiftKey) {
      // Shift+Enterで改行を許可
      return; // デフォルト動作で改行
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row w-full bg-zinc-900 text-white",
        isFitPreferred ? "h-fit" : "h-screen"
      )}
    >
      {/* Sidebar */}
      <div className="flex flex-col w-full md:w-1/6 bg-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <RaiLink
            href="/"
            className="text-xl font-bold transition-all hover:text-zinc-300"
          >
            AI Playground
          </RaiLink>
          <AnimatedGradientText className="bg-zinc-900">
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Beta
            </span>
          </AnimatedGradientText>
        </div>
        <div className="mt-4">
          {Object.keys(chatSessions).map((sessionId) => (
            <div
              key={sessionId}
              className={`flex items-center menu-item ${
                activeSession === sessionId ? "visible" : ""
              }`}
            >
              <button
                className={`w-full tg-button text-left p-2 rounded bg-zinc-900 flex items-center ${
                  activeSession === sessionId ? "bg-zinc-700" : ""
                }`}
                onClick={() => setActiveSession(sessionId)}
              >
                <FaRegCommentDots className="mr-2" />
                {chatSessions[sessionId].name}
              </button>
              <button
                className="ml-2 text-red-500 hover:text-red-400"
                aria-label="削除"
                onClick={() => handleDeleteSession(sessionId)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <button
            className="text-left p-2 mt-4 bg-zinc-600 rounded transition-all hover:bg-zinc-500"
            onClick={handleNewSession}
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={cn(
          "flex flex-col flex-1 w-full md:w-9/12 mr-0 md:mr-16 ml-3 p-4 ",
          isFitPreferred ? "h-fit" : "h-screen"
        )}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold relative">
            <button
              className="w-auto hover:bg-zinc-600 transition rounded-md p-2 flex items-center justify-between"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {modelDescriptions[model].type}{" "}
                <small className="text-zinc-400">
                  {modelDescriptions[model].displayName
                    ?.replace("GPT-", "")
                    .replace("Grok ", "")}
                </small>
                {modelDescriptions[model].outdated && (
                  <span className="text-xs ml-3 font-medium me-2 px-2 py-0.5 rounded bg-yellow-900 text-yellow-300">
                    レガシー
                  </span>
                )}
              </span>
              <BsArrowDown className="text-zinc-400 ml-1 text-sm" />
            </button>

            <div
              className={`dropdown ${
                isDropdownOpen ? "open" : "opacity-0 pointer-events-none"
              } absolute mt-2 z-50 roun ded shadow-2xl bg-zinc-800`}
              style={{ width: "45rem" }}
            >
              <label className="block p-4 text-zinc-300">モデル</label>

              <div className="flex">
                <div>
                  {Object.keys(modelDescriptions)
                    .slice(0, 6)
                    .map((modelKey) => (
                      <button
                        key={modelKey}
                        className="block px-4 py-2 text-left hover:bg-zinc-600 w-full items-center"
                        onClick={() => handleModelChange(modelKey)}
                      >
                        <div
                          className={`flex items-center ${
                            modelDescriptions[modelKey].outdated
                              ? "text-sm"
                              : "text-xl"
                          }`}
                        >
                          {modelDescriptions[modelKey].type === "ChatGPT" && (
                            <TbBrandOpenai className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Gemini" && (
                            <SiGooglegemini className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Claude" && (
                            <SiClaude className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Grok" && (
                            <FaXTwitter className="mr-2" />
                          )}
                          <span
                            className={`${
                              modelDescriptions[modelKey].outdated
                                ? "text-xs"
                                : "text-base"
                            }`}
                          >
                            {modelDescriptions[modelKey].displayName ||
                              modelKey}{" "}
                            {modelDescriptions[modelKey].outdated && (
                              <span className="text-xs font-medium me-2 px-1 py-0.5 rounded bg-yellow-900 text-yellow-300">
                                レガシー
                              </span>
                            )}
                          </span>
                        </div>
                        <small
                          className={`font-normal ml-4 ${
                            modelDescriptions[modelKey].outdated
                              ? "text-xs"
                              : "text-sm"
                          }`}
                        >
                          {modelDescriptions[modelKey].description}
                        </small>
                      </button>
                    ))}
                </div>

                <div>
                  {/* New section for next 6 items */}
                  {Object.keys(modelDescriptions)
                    .slice(6, 12)
                    .map((modelKey) => (
                      <button
                        key={modelKey}
                        className="block px-4 py-2 text-left hover:bg-zinc-600 w-full items-center"
                        onClick={() => handleModelChange(modelKey)}
                      >
                        <div
                          className={`flex items-center ${
                            modelDescriptions[modelKey].outdated
                              ? "text-sm"
                              : "text-xl"
                          }`}
                        >
                          {modelDescriptions[modelKey].type === "ChatGPT" && (
                            <TbBrandOpenai className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Gemini" && (
                            <SiGooglegemini className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Claude" && (
                            <SiClaude className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Grok" && (
                            <FaXTwitter className="mr-2" />
                          )}
                          <span
                            className={`${
                              modelDescriptions[modelKey].outdated
                                ? "text-xs"
                                : "text-base"
                            }`}
                          >
                            {modelDescriptions[modelKey].displayName ||
                              modelKey}{" "}
                            {modelDescriptions[modelKey].outdated && (
                              <span className="text-xs font-medium me-2 px-1 py-0.5 rounded bg-yellow-900 text-yellow-300">
                                レガシー
                              </span>
                            )}
                          </span>
                        </div>
                        <small
                          className={`font-normal ml-4 ${
                            modelDescriptions[modelKey].outdated
                              ? "text-xs"
                              : "text-sm"
                          }`}
                        >
                          {modelDescriptions[modelKey].description}
                        </small>
                      </button>
                    ))}
                </div>

                <div>
                  {/* New section for next 6 items */}
                  {Object.keys(modelDescriptions)
                    .slice(12, 18)
                    .map((modelKey) => (
                      <button
                        key={modelKey}
                        className="block px-4 py-2 text-left hover:bg-zinc-600 w-full items-center"
                        onClick={() => handleModelChange(modelKey)}
                      >
                        <div
                          className={`flex items-center ${
                            modelDescriptions[modelKey].outdated
                              ? "text-sm"
                              : "text-xl"
                          }`}
                        >
                          {modelDescriptions[modelKey].type === "ChatGPT" && (
                            <TbBrandOpenai className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Gemini" && (
                            <SiGooglegemini className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Claude" && (
                            <SiClaude className="mr-2" />
                          )}
                          {modelDescriptions[modelKey].type === "Grok" && (
                            <FaXTwitter className="mr-2" />
                          )}
                          <span
                            className={`${
                              modelDescriptions[modelKey].outdated
                                ? "text-xs"
                                : "text-base"
                            }`}
                          >
                            {modelDescriptions[modelKey].displayName ||
                              modelKey}{" "}
                            {modelDescriptions[modelKey].outdated && (
                              <span className="text-xs font-medium me-2 px-1 py-0.5 rounded bg-yellow-900 text-yellow-300">
                                レガシー
                              </span>
                            )}
                          </span>
                        </div>
                        <small
                          className={`font-normal ml-4 ${
                            modelDescriptions[modelKey].outdated
                              ? "text-xs"
                              : "text-sm"
                          }`}
                        >
                          {modelDescriptions[modelKey].description}
                        </small>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </h2>
          <button
            className="flex items-center hover:bg-zinc-800 p-2 rounded-md transition-all"
            aria-label="ユーザーを管理"
            onClick={() => setIsDropdownUserOpen(!isDropdownUserOpen)}
          >
            <AiOutlineUser className="text-xl" />
          </button>

          <div
            className={`dropdown ${
              isDropdownUserOpen ? "open" : "opacity-0 pointer-events-none"
            } absolute right-0 mt-44 mr-24 z-20 w-44 rounded shadow-2xl bg-zinc-800`}
          >
            {username && (
              <div>
                <div className="block px-4 py-2 text-left text-zinc-400 w-full">
                  {username}
                </div>
              </div>
            )}
            {!username && (
              <div>
                <div className="block px-4 py-2 text-left text-zinc-400 w-full">
                  ゲスト
                </div>
                <RaiLink
                  href="/login"
                  className="block px-4 py-2 text-left hover:bg-zinc-600 w-full"
                >
                  ログイン
                </RaiLink>
              </div>
            )}
            <hr></hr>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="block px-4 py-2 text-left hover:bg-zinc-600 w-full"
            >
              設定
            </button>
          </div>

          {/* Settings Modal */}
          {isSettingsOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-zinc-800 p-6 rounded-md w-80">
                <h2 className="text-xl font-bold mb-4">設定</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400">
                    ユーザー名
                  </label>
                  <input
                    type="text"
                    required={true}
                    minLength={1}
                    className="w-full p-2 mt-1 text-white bg-zinc-700 rounded"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-400">
                    システム プロンプト
                  </label>

                  <p className="text-sm">
                    o1では、システムプロンプトは無効になります。
                  </p>

                  <textarea
                    className="w-full p-2 mt-1 text-white bg-zinc-700 rounded"
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                    onClick={handleSaveSettings}
                  >
                    保存
                  </button>
                </div>

                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`bg-red-600 error-message ${
            error ? "visible" : ""
          } w-full md:w-7/12 m-auto text-white p-2 rounded text-center mt-2 mb-4`}
        >
          {error}
        </div>

        {/* Chat Log */}
        <div className="flex-1 bg-zinc-800 m-auto w-full md:w-7/12 h-screen p-4 rounded overflow-y-auto">
          {activeSession &&
            chatSessions[activeSession]?.messages?.map((log, index) => (
              <div key={index} className={`flex w-full message-log visible`}>
                <div
                  className={`p-2 my-2 rounded-lg max-w-1/2 w-auto ${
                    log.startsWith("AI:")
                      ? "text-white"
                      : "bg-zinc-700 text-white ml-auto"
                  }`}
                >
                  {log.startsWith("AI:") && (
                    <div className="flex items-start">
                      <div className="p-1 bg-zinc-700 text-white">
                        <FaRobot />
                      </div>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="ml-3 prose prose-invert"
                      >
                        {log.replace("AI: ", "")}
                      </ReactMarkdown>
                    </div>
                  )}
                  {!log.startsWith("AI:") && (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="p-1">
                      {log}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Input Area */}
        <div className="mt-4 w-full md:w-7/12 m-auto items-center">
          {pastedImage && (
            <img
              src={`${pastedImage}`}
              alt="Pasted"
              className="mb-4 size-16 rounded-md"
            />
          )}
        </div>
        <div className="mt-4 w-full md:w-7/12 m-auto flex items-center">
          <textarea
            placeholder={"AI にメッセージを送信する"}
            className="flex-1 p-2 bg-zinc-700 rounded-l text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`p-2 ml-2 ${
              message.trim() !== "" || pastedImage
                ? "bg-blue-400 hover:bg-blue-500"
                : "bg-blue-200"
            } rounded-full`}
            aria-label="送信"
            onClick={handleSendMessage}
            disabled={!message.trim() && !pastedImage}
          >
            <BiSend />
          </button>
        </div>
        <p className="text-xs text-center text-zinc-500 mt-2">
          AI の回答は必ずしも正しいとは限りません。すべての AI
          が無制限に利用できます。
          <br />
          <small>
            <a href="https://voids.top/">Powered by voids.top</a>
            <RaiLink href="/notes" className="ml-4">
              利用dに関する質問
            </RaiLink>
          </small>
        </p>
      </div>
    </div>
  );
};

export default ChatApp;
