import { FadeIn } from "@/components/fade-in";

export default function StackPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24">
      <FadeIn>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">Stack</h1>
          <p className="text-base text-muted-foreground">
            This section is under construction.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-8 text-base text-muted-foreground">
          Hardware, software, and configuration details will be listed here.
        </section>
      </FadeIn>
    </main>
  );
}
