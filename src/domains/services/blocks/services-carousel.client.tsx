'use client'

import { Animated } from '@/components/animated'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import type { Media, Service } from '@/payload-types'
import { cn } from '@/utils/cn'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

interface ServicesCarouselClientProps {
  heading?: string | null
  description?: string | null
  services: Service[]
}

export function ServicesCarouselClient({
  heading,
  description,
  services,
}: ServicesCarouselClientProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

  if (services.length === 0) return null

  return (
    <div className="relative bg-black flex flex-col justify-around overflow-hidden py-6 md:py-12">
      <div className="relative">
        <div className="flex flex-col mb-8 md:mb-12 gap-6">
          <div className="px-6 text-left">
            {heading && (
              <Animated>
                <h2 className="text-4xl uppercase font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {heading}
                </h2>
              </Animated>
            )}
          </div>
          {description && (
            <Animated className="delay-200">
              <p className="text-xs md:text-sm max-w-4xl text-justify text-white/80 px-6 lg:text-base 2xl:text-lg">
                {description}
              </p>
            </Animated>
          )}
        </div>
        <Animated className="delay-200">
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="mx-auto w-full px-6"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {services.map((service, index) => {
                const coverImage = service.coverImage as Media | null
                const imageUrl = coverImage?.url

                return (
                  <CarouselItem
                    key={service.id}
                    className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3 xl:basis-1/5 2xl:basis-1/4"
                  >
                    <Link
                      href={`/hizmetler/${service.slug}`}
                      className="group relative block h-full"
                    >
                      <div className="relative aspect-square lg:aspect-3/4 overflow-hidden rounded-2xl bg-stone-900">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={service.name}
                            fill
                            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-linear-to-br from-stone-800 to-stone-900" />
                        )}

                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-amber-600/0 transition-colors duration-500 group-hover:bg-amber-600/10" />

                        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                          <div className="flex items-end justify-between gap-4">
                            <div className="flex-1">
                              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-amber-400/70">
                                {service.duration && `${service.duration} dakika`}
                              </span>
                              <h3 className="text-xl font-medium text-white md:text-2xl">
                                {service.name}
                              </h3>
                              {service.description && (
                                <p className="mt-2 line-clamp-2 text-sm text-stone-300/80">
                                  {service.description}
                                </p>
                              )}
                            </div>

                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-amber-400/50 group-hover:bg-amber-400 group-hover:text-stone-900">
                              <ArrowUpRight className="size-5 text-white transition-colors group-hover:text-stone-900" />
                            </div>
                          </div>
                        </div>

                        <div className="absolute right-6 top-6 md:right-8 md:top-8">
                          <span className="font-mono text-sm text-black/30">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
          </Carousel>
        </Animated>

        <Animated className="delay-300">
          <div className="mt-8 flex items-center justify-start px-6 gap-4 md:gap-8 md:mt-14">
            <button
              onClick={scrollPrev}
              className="group flex size-10 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/20 backdrop-blur-sm transition-all hover:border-amber-400/50 hover:bg-amber-400"
              aria-label="Önceki"
            >
              <ChevronLeft className="size-5 text-amber-300 transition-colors group-hover:text-stone-900" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    current === index ? 'w-8 bg-amber-400' : 'w-1.5 bg-white/20 hover:bg-white/40',
                  )}
                  aria-label={`Slayt ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="group flex size-10 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/20 backdrop-blur-sm transition-all hover:border-amber-400/50 hover:bg-amber-400"
              aria-label="Sonraki"
            >
              <ChevronRight className="size-5 text-amber-300 transition-colors group-hover:text-stone-900" />
            </button>
          </div>
        </Animated>
      </div>
    </div>
  )
}
