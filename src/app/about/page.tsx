import { FadeIn } from "@/components/fade-in";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24">
      <FadeIn>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">About Me</h1>
          <p className="text-base text-muted-foreground">
            This section is under construction.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-10 grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex h-72 w-full items-center justify-center border border-border bg-black/40 backdrop-blur-md text-sm text-muted-foreground">
            Profile photo placeholder
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Introduction
              </h2>
              <p className="text-base text-muted-foreground">
                A short introduction will live here. I will share my background,
                current focus, and the kind of work I enjoy most.
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">Skills</h2>
              <ul className="list-disc space-y-1 pl-5 text-base text-muted-foreground">
                <li>Frontend engineering</li>
                <li>Design systems</li>
                <li>Performance tuning</li>
                <li>Product prototyping</li>
              </ul>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
