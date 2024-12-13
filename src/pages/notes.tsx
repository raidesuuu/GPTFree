import { RaiLink } from "@/components/RaiLink";
import React from "react";

const ChatApp: React.FC = () => {
  return (
    <div className="h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-gray-800 p-6 text-center">
        <h1 className="text-3xl font-bold">
          このサイトについて、使い方についての説明
        </h1>
        <p className="mt-2 text-lg text-gray-400">
          ようこそ！このページでは、このサイトについてや使い方、設定方法について説明します。
          <br />
          <br />
          <RaiLink
            href="/"
            className="text-left p-2 mt-8 bg-blue-600 rounded hover:bg-blue-500"
          >
            新しい会話
          </RaiLink>
        </p>
      </div>

      {/* Main Content Section */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-semibold">はじめに</h2>
            <p className="text-gray-300">
              このチャットシステムでは、AI
              モデルと会話を行い、質問やリクエストに対する応答を得ることができます。
              <br />
              ご利用に際して、以下のリンクから詳細情報を確認できます。
            </p>
          </section>

          {/* Features Section */}
          <section>
            <h2 className="text-2xl font-semibold">主な機能</h2>
            <ul className="list-disc pl-5 text-gray-300">
              <li>会話セッションの作成と削除</li>
              <li>複数のAIモデルを切り替えて使用</li>
              <li>メッセージの送信と履歴の確認</li>
            </ul>
          </section>

          {/* AI Models Section */}
          <section>
            <h2 className="text-2xl font-semibold">使用できるAIモデル</h2>
            <p className="text-gray-300">
              現在使用可能なAIモデルは以下の通りです：
            </p>
            <ul className="list-disc pl-5 text-gray-300">
              <li>
                <strong>GPT-4o:</strong> OpenAI
                によるほとんどのタスクに最適なAIモデル。
              </li>
              <li>
                <strong>o1-preview:</strong> OpenAI
                による高度な推論を使用するAIモデル。
              </li>
              <li>
                <strong>o1-mini:</strong> OpenAI
                によるo1-previewより推論が早いAIモデル。
              </li>
              <li>
                <strong>Gemini 1.5 Pro:</strong> Google
                による幅広いタスクに対応する最高のAIモデル。
              </li>
              <li>
                <strong>Gemini 1.5 Flash:</strong> Google
                による軽量モデルで、スピードと効率を最適化したAIモデル。
              </li>
              <li>
                <strong>Claude 3.5 Sonnet:</strong> Anthropic
                による最も賢いAIモデル。
              </li>
            </ul>
          </section>

          {/* Error Handling Section */}
          <section>
            <h2 className="text-2xl font-semibold">エラーハンドリング</h2>
            <p className="text-gray-300">
              AIの応答にエラーが発生した場合、メッセージが表示されます。
              エラー内容に関しては、以下の情報を参照できます：
            </p>
            <ul className="list-disc pl-5 text-gray-300">
              <li>
                INVALID_RESPONSE: サーバーから正しい返答が送られていません。
              </li>
              <li>CANNOT_REACH: サーバーに接続できませんでした。</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 p-4 text-center text-gray-500">
        <p>
          AI の回答は必ずしも正しいとは限りません。すべての AI
          が無制限に利用できます。
          <a
            href="https://voids.top/"
            target="_blank"
            className="hover:text-blue-600 transition-all"
            rel="noopener noreferrer"
          >
            Powered by voids.top
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChatApp;
