import AnimatedShinyText from "@components/ui/animated-shiny-text";
import { RainbowButton } from "@components/ui/rainbow-button";
import { cn } from "@lib/utils";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { MarqueeDemo } from "@/components/MarqueeComponent";
import { RaiLink } from "@components/RaiLink";

const ChatApp: React.FC = () => {
  return (
    <div className="bg-zinc-950 text-white">
      <header className=" bg-zinc-900 w-full text-white p-4">
        <div className="container mx-auto flex items-center">
          {/* ロゴ部分 */}
          <RaiLink href="/" className="text-xl font-bold mr-10 text-white">
            AI Playground
          </RaiLink>

          {/* ナビゲーションメニュー */}
          <nav className="flex space-x-4">
            <RaiLink href="/app">アプリ</RaiLink>
            <RaiLink href="/notes">このアプリについて</RaiLink>
          </nav>

          {/* 「今すぐ開始」のボタン */}
          <RaiLink href="/app" className="ml-auto">
            <RainbowButton className="inline-flex items-center justify-center py-1">
              今すぐ開始
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </RainbowButton>
          </RaiLink>
        </div>
      </header>

      {/* Section */}
      <div className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 h-screen flex w-full items-center justify-center p-6 text-center">
        <div className="w-full">
          <RaiLink href="/app">
            <div
              className={cn(
                "group rounded-full border w-1/4 m-auto mb-4 border-black/5 bg-zinc-700 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ 新しいデザインの登場＆ベータ版が利用可能</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </RaiLink>
          <h1 className="text-3xl font-bold">すべて無料</h1>
          <p className="mt-2 text-lg text-gray-400 mb-3 w-1/2 m-auto">
            GPT-4o、o1、Gemini 1.5 Pro、Claude 3.5 Sonnet
            などのAIをすべて無制限に無料で使用することができます！
          </p>

          <RaiLink href="/app">
            <RainbowButton className="inline-flex mr-4 items-center justify-center py-1">
              無制限の AI を今すぐ使用する
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </RainbowButton>
          </RaiLink>
        </div>
      </div>

      <div className="bg-zinc-950 w-full pt-9 pb-9 text-center">
        <h1 className="text-3xl font-bold mb-4">すべてのモデルが無料</h1>
        <p className="mt-2 text-lg text-gray-400 mb-3 w-1/2 m-auto">
          OpenAI、Google、Anthropic、X
          の主要なモデルをすべて無料、無制限で使用することができます！
        </p>

        <MarqueeDemo></MarqueeDemo>
      </div>

      <div className="bg-zinc-950 w-full pt-9 pb-9 text-center">
        <h1 className="text-3xl font-bold mb-4">直感的なUI</h1>
        <p className="mt-2 text-lg text-gray-400 mb-3 w-1/2 m-auto">
          ChatGPT
          のサイトのような直感的なUIであり、すぐにわかりやすく使用することができます。
        </p>
        <img src="/demo-1.png" className="m-auto rounded-md w-2/4" />
      </div>

      <div className="bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex w-full items-center justify-center pt-16 pb-16 text-center">
        <div className="w-full">
          <h1 className="text-3xl font-bold">今すぐ始めよう！</h1>
          <p className="mt-2 text-lg text-gray-400 mb-3 w-1/2 m-auto">
            今すぐいろいろな種類のAIを利用しよう！<br></br>
            すべてのAI及びAPIは、
            <RaiLink external={true} href="https://voids.top/" className="">
              voids.top
            </RaiLink>
            によって提供されています。
          </p>

          <RaiLink href="/app">
            <RainbowButton className="inline-flex mr-4 items-center justify-center py-1">
              今すぐ開始
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </RainbowButton>
          </RaiLink>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-zinc-800 mt-5 p-4 text-center text-gray-500">
        <p>
          AI の回答は必ずしも正しいとは限りません。すべての AI
          が無制限に利用できます。
          <RaiLink external={true} href="https://voids.top/" className="">
            Powered by voids.top
          </RaiLink>
        </p>
      </div>
    </div>
  );
};

export default ChatApp;
