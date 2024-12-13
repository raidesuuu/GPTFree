import React from "react";

import { cn } from "@/lib/utils";
interface UplATag extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
}

export function RaiLink({
  href,
  children,
  external,
  className,
  ...props
}: UplATag) {
  return (
    <a
      href={href}
      className={cn(
        "transition-all hover:text-zinc-200 hover:cursor-pointer",

        className
      )}
      target={external ? "_blank" : ""} // external が true の場合だけ target を設定
      rel={external ? "noopener noreferrer" : ""} // セキュリティ対策として rel を設定
      {...props}
    >
      {children}
    </a>
  );
}
