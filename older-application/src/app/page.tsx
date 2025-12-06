import PageLayout, { Logo } from "@/components/layouts/page-layout";
import { ActionButtons } from "./_components/action-button";
import { TestimonialCards } from "./_components/testimonial-cards";
import { VideoBackground } from "./_components/video-background";
import type { TestimonialData } from "./api/about/route";

async function getTestimonialData(): Promise<TestimonialData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/about`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Page() {
  const data = await getTestimonialData();

  return (
    <PageLayout>
      <section id="hero" aria-label="Ana Sayfa" className="relative h-screen w-full shrink-0 snap-start snap-always">
        <VideoBackground />

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 md:w-1/2 md:items-start md:justify-center md:px-12 md:pb-0 lg:w-2/5 lg:px-16">
          <header className="mb-6 flex w-full justify-center md:mb-8 md:justify-start">
            <h1 className="sr-only">Belle Güzellik - Profesyonel Bakım ve Lazer Epilasyon</h1>
            <Logo className="animate-fade-in h-44 w-auto" />
          </header>

          <nav aria-label="Hızlı Erişim" className="w-full max-w-md text-center md:max-w-none md:text-left">
            <div className="animate-fade-in-delay-2">
              <ActionButtons />
            </div>
          </nav>
        </div>
      </section>

      <section
        id="testimonials"
        aria-labelledby="testimonials-title"
        className="relative flex h-screen w-full shrink-0 snap-start snap-always flex-col items-center justify-center overflow-hidden bg-linear-to-b from-stone-50 via-amber-50/30 to-stone-100 px-4 py-8 md:px-12 md:py-16 lg:px-16"
      >
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col justify-center">
          <header className="mb-6 text-center md:mb-12">
            <h2
              id="testimonials-title"
              className="mb-3 font-serif text-2xl font-semibold tracking-tight text-stone-800 md:mb-4 md:text-5xl lg:text-6xl"
            >
              {data.title}
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-stone-600 sm:text-base md:text-xl">{data.description}</p>
          </header>

          <TestimonialCards testimonials={data.testimonials} />
        </div>
      </section>
    </PageLayout>
  );
}
