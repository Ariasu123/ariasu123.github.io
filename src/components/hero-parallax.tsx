"use client";

import { motion, useScroll, useTransform } from "framer-motion";

type HeroParallaxProps = {
  title: string;
};

export function HeroParallax({ title }: HeroParallaxProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
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
    </section>
  );
}
