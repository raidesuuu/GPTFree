import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";

const reviews = [
  {
    name: "GPT-4o",
    username: "@OpenAI",
    body: "GPT-4oは、OpenAIによって開発されたほとんどのタスクに最適なAIモデルです。",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "GPT-4o mini",
    username: "@OpenAI",
    body: "GPT-4o mini は、OpenAIが開発した日常の作業を効率化するAIモデルです。",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "o1-preview",
    username: "@OpenAI",
    body: "o1 は、OpenAIによって開発された高度な推論を使用するAIモデルです。",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "o1-mini",
    username: "@OpenAI",
    body: "o1-mini は、OpenAIが開発した推論がスピードアップされたAIモデルです。",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  },
  {
    name: "Gemini 1.5 Pro",
    username: "@Google",
    body: "Gemini 1.5 Pro は、Googleによる幅広いタスクに対応する最高のモデルです。",
    img: "/gemini.svg",
  },
  {
    name: "Gemini 1.5 Flash",
    username: "@Google",
    body: "Gemini 1.5 Flash は、Googleによる軽量でスピードと効率を最適化したAIです。",
    img: "/gemini.svg",
  },
  {
    name: "Claude 3.5 Sonnet",
    username: "@Anthropic",
    body: "Claude 3.5 Sonnet は、Anthropicによる最も賢いモデルです。",
    img: "/claude.svg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 !bg-zinc-700"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-3/4 m-auto flex-col items-center justify-center overflow-hidden rounded-lg  bg-zinc-800 md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s] bg-zinc-800 text-left">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        className="[--duration:20s] bg-zinc-800 text-left"
      >
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black dark:from-background"></div>
    </div>
  );
}
