"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "../api/about/route";

interface TestimonialCardsProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} yıldız üzerinden ${rating}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-stone-300 text-stone-300"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CarouselDots({ count, current }: { count: number; current: number }) {
  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current ? "w-6 bg-amber-500" : "w-2 bg-stone-300 hover:bg-stone-400"
          }`}
          aria-label={`Yorum ${i + 1}'e git`}
        />
      ))}
    </div>
  );
}

export function TestimonialCards({ testimonials }: TestimonialCardsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  if (!testimonials?.length) return null;

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        className="mx-auto w-full max-w-6xl"
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={`${testimonial.name}-${index}`} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <article className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-linear-to-br from-white via-stone-50/50 to-amber-50/30 p-6 shadow-lg shadow-stone-200/40 transition-all duration-500 hover:border-amber-200/60 hover:shadow-xl hover:shadow-amber-100/40">
                <div className="absolute -top-4 -right-4 opacity-[0.07] transition-all duration-500 group-hover:opacity-[0.12]">
                  <Quote className="h-24 w-24 rotate-180 text-amber-600" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  <blockquote className="mb-2 flex-1">
                    <p className="font-serif text-base leading-relaxed text-stone-700 italic">
                      &quot;{testimonial.comment}&quot;
                    </p>
                  </blockquote>

                  <footer className="flex items-center gap-3 border-t border-stone-100 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 font-semibold text-white shadow-md shadow-amber-200/50">
                      {getInitials(testimonial.name)}
                    </div>
                    <div>
                      <p className="font-medium text-stone-800">{testimonial.name}</p>
                      <p className="text-sm text-amber-600/80">{testimonial.service}</p>
                    </div>
                  </footer>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-0 hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-left-4 md:flex lg:-left-12" />
        <CarouselNext className="right-0 hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-right-4 md:flex lg:-right-12" />
      </Carousel>

      <CarouselDots count={count} current={current} />
    </div>
  );
}
