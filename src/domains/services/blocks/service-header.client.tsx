'use client'

import { Animated } from '@/components/animated'
import type { Media, Service } from '@/payload-types'
import { Clock } from 'lucide-react'

interface ServiceHeaderBlockProps {
  service: Service | number
}

export function ServiceHeaderBlock({ service }: ServiceHeaderBlockProps) {
  if (typeof service === 'number') {
    return null
  }

  const coverImage = service.coverImage as Media | null

  return (
    <section className="relative flex min-h-[50vh] w-full items-end overflow-hidden bg-muted">
      {coverImage?.url && (
        <div className="absolute inset-0">
          <img
            src={coverImage.url}
            alt={coverImage.alt || service.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}

      <div className="relative z-10 w-full px-6 py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <Animated className="delay-200">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {service.name}
            </h1>
          </Animated>

          {service.description && (
            <Animated className="mt-4 delay-300">
              <p className="max-w-2xl text-lg text-white/90 md:text-xl">{service.description}</p>
            </Animated>
          )}

          {service.duration && (
            <Animated className="mt-6 delay-400">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Clock className="size-4" />
                {service.duration} dakika
              </span>
            </Animated>
          )}
        </div>
      </div>
    </section>
  )
}
