'use client'

import { cn } from '@/utils/cn'
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'

interface SectionContextValue {
  isVisible: boolean
}

const SectionContext = createContext<SectionContextValue>({ isVisible: false })

export function useSectionVisibility() {
  return useContext(SectionContext)
}

interface SectionProps extends PropsWithChildren {
  id?: string
  ariaLabel?: string
  className?: string
  enableFullscreen?: boolean
}

export function Section({
  id,
  ariaLabel,
  className,
  enableFullscreen = true,
  children,
}: SectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        root: section.closest('[data-scroll-snap-container]'),
        threshold: 0.5,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <SectionContext.Provider value={{ isVisible }}>
      <section
        ref={sectionRef}
        id={id}
        aria-label={ariaLabel}
        className={cn(
          'w-full shrink-0 transition-opacity duration-500',
          enableFullscreen && 'flex h-screen snap-start snap-always *:w-full',
          className,
        )}
      >
        {children}
      </section>
    </SectionContext.Provider>
  )
}
