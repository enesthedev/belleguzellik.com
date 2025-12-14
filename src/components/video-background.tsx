'use client'

import { Media } from '@/payload-types'
import { useCallback, useEffect, useRef, useState } from 'react'

interface VideoBackgroundProps {
  thumbnail?: Media | null
  movie?: Media | null
}

function getInitialLoadState(): boolean {
  if (typeof document === 'undefined') return false
  return document.readyState === 'complete'
}

export function VideoBackground({ thumbnail, movie }: VideoBackgroundProps) {
  const [shouldLoad, setShouldLoad] = useState(getInitialLoadState)
  const [opacity, setOpacity] = useState(1)
  const scrollContainerRef = useRef<Element | null>(null)
  const rafIdRef = useRef<number>(0)

  useEffect(() => {
    if (shouldLoad) return

    const handleLoad = () => setShouldLoad(true)
    window.addEventListener('load', handleLoad)

    return () => window.removeEventListener('load', handleLoad)
  }, [shouldLoad])

  const handleScroll = useCallback(() => {
    if (rafIdRef.current) return

    rafIdRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const fadeStart = windowHeight * 0.3
      const fadeEnd = windowHeight * 0.8

      if (scrollTop <= fadeStart) {
        setOpacity(1)
      } else if (scrollTop >= fadeEnd) {
        setOpacity(0)
      } else {
        const progress = (scrollTop - fadeStart) / (fadeEnd - fadeStart)
        setOpacity(1 - progress)
      }

      rafIdRef.current = 0
    })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [handleScroll])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-300 md:inset-y-0 md:right-0 md:left-auto md:w-1/2 lg:w-3/5"
      style={{ opacity }}
    >
      {thumbnail && (
        <img
          src={thumbnail.url}
          alt={thumbnail.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-top md:object-center"
        />
      )}
      {shouldLoad && movie && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-0 transition-opacity duration-700 md:object-center"
          onCanPlay={(e) => e.currentTarget.classList.replace('opacity-0', 'opacity-100')}
        >
          <source src={movie.url} type={movie.mimeType} />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white via-60% to-white md:bg-gradient-to-l md:from-transparent md:via-white/10 md:via-0% md:to-white/70" />
    </div>
  )
}
