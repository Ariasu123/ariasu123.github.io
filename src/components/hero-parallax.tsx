"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

type HeroParallaxProps = {
  title: string;
  scrollTargetId?: string;
};

export function HeroParallax({ title, scrollTargetId }: HeroParallaxProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

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
      <div className="relative z-20 flex h-full items-center justify-center">
        <h1 className="text-4xl font-semibold text-gray-100 sm:text-5xl">
          {title}
        </h1>
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
