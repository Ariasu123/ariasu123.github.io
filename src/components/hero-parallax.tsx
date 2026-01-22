"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroParallaxProps = {
  scrollTargetId?: string;
};

const QUOTES = [
  {
    text: "Stay hungry, stay foolish.",
    author: "Steve Jobs",
  },
  {
    text: "The future is already here. It is just not evenly distributed.",
    author: "William Gibson",
  },
  {
    text: "What we know is a drop, what we do not know is an ocean.",
    author: "Isaac Newton",
  },
  {
    text: "Science is a way of thinking much more than it is a body of knowledge.",
    author: "Carl Sagan",
  },
  {
    text: "The mountains are calling and I must go.",
    author: "John Muir",
  },
  {
    text: "Programs must be written for people to read.",
    author: "Harold Abelson",
  },
];

export function HeroParallax({ scrollTargetId }: HeroParallaxProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const nextQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(nextQuote);
  }, []);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(true);
  }, [quote]);

  useEffect(() => {
    if (displayText.length >= quote.text.length) {
      setIsTyping(false);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(quote.text.slice(0, displayText.length + 1));
    }, 50);

    return () => clearTimeout(timeout);
  }, [displayText, quote.text]);

  const handleScrollClick = () => {
    if (!scrollTargetId) {
      return;
    }

    const target = document.getElementById(scrollTargetId);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="/hero-bg.jpg"
          alt=""
          className="h-[120%] w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="relative z-20 flex h-full items-center justify-center px-6 text-center">
        <div className="space-y-4 font-mono text-gray-100">
          <p
            className="text-2xl sm:text-3xl"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          >
            {displayText}
            <span className={cn("typewriter-cursor", !isTyping && "opacity-0")}>
              |
            </span>
          </p>
          <p
            className={cn(
              "text-sm text-muted-foreground transition-opacity duration-300",
              displayText.length >= quote.text.length ? "opacity-100" : "opacity-0"
            )}
          >
            — {quote.author}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleScrollClick}
        aria-label="Scroll to content"
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-gray-100 transition hover:text-white"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </span>
      </button>
    </section>
  );
}
