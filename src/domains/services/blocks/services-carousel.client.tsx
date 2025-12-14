import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Media } from '@/payload-types'
import config from '@/payload.config'
import { ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

interface ServicesCarouselBlockProps {
  heading?: string | null
  description?: string | null
}

export async function ServicesCarouselBlock({ heading, description }: ServicesCarouselBlockProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: services } = await payload.find({
    collection: 'services',
    locale: 'tr',
    limit: 100,
    depth: 1,
  })

  if (services.length === 0) return null

  return (
    <section
      id="services"
      className="flex flex-col items-center justify-center bg-gradient-to-b from-stone-100 via-white to-stone-50 px-4 py-12 md:px-12 md:py-20 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 text-center md:mb-12">
          {heading && (
            <h2 className="mb-3 font-serif text-3xl font-semibold tracking-tight text-stone-800 md:mb-4 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mx-auto max-w-2xl text-sm text-stone-600 sm:text-base md:text-xl">
              {description}
            </p>
          )}
        </header>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="mx-auto w-full"
        >
          <CarouselContent className="-ml-4">
            {services.map((service) => {
              const coverImage = service.coverImage as Media | null
              const imageUrl = coverImage?.url

              return (
                <CarouselItem key={service.id} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    className="group relative block h-full overflow-hidden rounded-2xl border border-stone-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/60"
                  >
                    <div className="aspect-4/3 overflow-hidden relative">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-amber-100 to-amber-200">
                          <span className="text-4xl font-bold text-amber-600/30">
                            {service.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="mb-2 text-lg font-semibold text-stone-800 transition-colors group-hover:text-amber-700">
                        {service.name}
                      </h3>

                      {service.description && (
                        <p className="mb-4 line-clamp-2 text-sm text-stone-600">
                          {service.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        {service.duration && (
                          <span className="flex items-center gap-1 text-sm text-stone-500">
                            <Clock className="size-3.5" />
                            {service.duration} dk
                          </span>
                        )}
                        <ArrowRight className="size-5 text-stone-400 transition-all group-hover:translate-x-1 group-hover:text-amber-600" />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              )
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-left-4 md:flex lg:-left-12" />
          <CarouselNext className="hidden border-stone-200 bg-white/90 text-stone-600 shadow-lg backdrop-blur-sm hover:bg-white hover:text-amber-600 md:-right-4 md:flex lg:-right-12" />
        </Carousel>
      </div>
    </section>
  )
}
