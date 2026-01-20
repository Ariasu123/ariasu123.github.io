"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const introText = "我是 Ariasu。";
  const [displayText, setDisplayText] = useState(
    shouldReduceMotion ? introText : ""
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    if (displayText.length >= introText.length) {
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(introText.slice(0, displayText.length + 1));
    }, 40);

    return () => clearTimeout(timeout);
  }, [displayText, introText, shouldReduceMotion]);

  return (
    <section className="space-y-6">
      <motion.p
        className="text-sm font-medium uppercase tracking-[0.2em] text-primary"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
      >
        Personal Blog
      </motion.p>
      <motion.h1
        className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="typewriter">{displayText}</span>
      </motion.h1>
      <motion.p
        className="max-w-2xl text-base leading-7 text-muted-foreground"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        你好，世界。这是我在数字荒原建立的第一个据点。
      </motion.p>
      <motion.div
        className="flex flex-wrap gap-3"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          href="/blog"
          className="inline-flex items-center justify-center border border-primary bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:shadow-[0_0_12px_rgba(57,255,20,0.35)]"
        >
          View all posts
        </Link>
        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center justify-center border border-border px-5 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
        >
          Contact me
        </a>
      </motion.div>
    </section>
  );
}
