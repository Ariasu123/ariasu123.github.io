import { FadeIn } from "@/components/fade-in";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24">
      <FadeIn>
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">About Me</h1>
          {/* 修改点 1: 删除了 under construction，换成了更有感觉的英文副标题 */}
          <p className="text-base text-muted-foreground">
            Exploring the boundaries of AI & Code.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={0.1}>
        {/* 修改点 2: 这里的布局使用了 items-center，已经能很好地垂直居中了 */}
        <section className="mt-16 grid gap-12 md:grid-cols-[auto_1fr] md:gap-16 md:items-center">
          
          {/* 头像区域 */}
          <div className="flex w-full justify-center md:justify-start">
            <img
              src="https://github.com/Ariasu123.png"
              alt="Ariasu"
              className="h-64 w-64 rounded-2xl object-cover shadow-2xl transition-transform hover:scale-105 duration-500" 
              // 加了一点点 hover 效果和 rounded-2xl 让圆角更柔和
            />
          </div>

          {/* 文字区域 */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Introduction
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  我是 Ariasu。就读于华中科技大学集成电路学院，目前研一。
                </p>
                <p>
                  一名正在探索 AI 编程边界的开发者 (Vibe Coder)。 在这个
                  &quot;数字荒原&quot; 里，我致力于通过 AI 辅助工具将想法转化为现实。
                  我不只是在写代码，更是在与 AI 的结对编程中寻找新的创造力范式。
                </p>
                <p>这个博客是我记录学习的据点。</p>
              </div>
            </div>
          </div>

        </section>
      </FadeIn>
    </main>
  );
}