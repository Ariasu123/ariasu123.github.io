import { FadeIn } from "@/components/fade-in";

export default function WikiPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24">
      <FadeIn>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">Wiki</h1>
          <p className="text-base text-muted-foreground">
            This section is under construction.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-8 text-base text-muted-foreground">
          A knowledge base of notes, references, and learning logs is coming
          soon.
        </section>
      </FadeIn>
    </main>
  );
}
