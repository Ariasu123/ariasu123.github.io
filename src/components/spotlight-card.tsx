"use client";

import type { CSSProperties, ComponentPropsWithoutRef, MouseEvent } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = ComponentPropsWithoutRef<"article">;

type SpotlightState = {
  x: number;
  y: number;
  visible: number;
};

export function SpotlightCard({
  children,
  className,
  style: styleProp,
  ...props
}: SpotlightCardProps) {
  const [spotlight, setSpotlight] = useState<SpotlightState>({
    x: 0,
    y: 0,
    visible: 0,
  });

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setSpotlight({ x, y, visible: 1 });
  };

  const handleLeave = () => {
    setSpotlight((prev) => ({ ...prev, visible: 0 }));
  };

  const style = {
    ...styleProp,
    "--spotlight-x": `${spotlight.x}px`,
    "--spotlight-y": `${spotlight.y}px`,
    "--spotlight-visible": spotlight.visible.toString(),
  } as CSSProperties;

  return (
    <article
      className={cn("spotlight-card", className)}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </article>
  );
}
