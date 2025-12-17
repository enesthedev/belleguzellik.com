'use client'

import { Animated } from '@/components/animated'
import type { Media, Service } from '@/payload-types'
import { cn } from '@/utils/cn'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ServicesGridClientProps {
  heading?: string | null
  description?: string | null
  services: Service[]
}

export function ServicesGridClient({
  heading,
  description,
  services,
}: ServicesGridClientProps) {
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
          <div className="mx-auto w-full px-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 2xl:grid-cols-5">
              {services.map((service) => {
                const coverImage = service.coverImage as Media | null
                const imageUrl = coverImage?.url

                return (
                  <Link
                    key={service.id}
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
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </Animated>
      </div>
    </div>
  )
}

