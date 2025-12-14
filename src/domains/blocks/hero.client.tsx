import { ActionButton } from '@/components/action-button'
import { Animated } from '@/components/animated'
import Logo from '@/components/logo'
import { VideoBackground } from '@/components/video-background'
import type { Media } from '@/payload-types'
import { Clock, MapPin, Phone } from 'lucide-react'

interface HeroBlockProps {
  heading?: string | null
  subheading?: string | null
  backgroundImage?: Media | null
  backgroundVideo?: Media | null
  showLogo?: boolean | null
  actions?:
    | {
        label: string
        link: string
        icon?: 'map-pin' | 'phone' | 'clock' | null
        id?: string | null
      }[]
    | null
}

export function HeroBlock({
  heading,
  subheading,
  backgroundImage,
  backgroundVideo,
  showLogo,
  actions,
}: HeroBlockProps) {
  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'map-pin':
        return <MapPin className="size-6 text-gray-700" aria-hidden="true" />
      case 'phone':
        return <Phone className="size-6 text-gray-700" aria-hidden="true" />
      case 'clock':
        return <Clock className="size-6 text-gray-700" aria-hidden="true" />
      default:
        return null
    }
  }

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden bg-white">
      <VideoBackground movie={backgroundVideo} thumbnail={backgroundImage} />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-12 md:w-1/2 md:items-start md:justify-center md:px-12 md:pb-0 lg:w-2/5 lg:px-16">
        {showLogo && (
          <Animated as="header" className="mb-6 flex w-full justify-center delay-200 md:mb-8">
            <Logo className="h-52 w-auto " />
          </Animated>
        )}

        {heading && (
          <Animated className="mb-4 text-center md:text-left delay-200">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">{heading}</h1>
          </Animated>
        )}

        {subheading && (
          <Animated className="mb-8 text-center md:text-left delay-300">
            <p className="max-w-2xl text-lg text-white/90 md:text-xl">{subheading}</p>
          </Animated>
        )}

        {actions && actions.length > 0 && (
          <div className="w-full max-w-md text-center md:max-w-none md:text-left">
            <nav className="flex w-full flex-col gap-4">
              {actions.map((action, index) => (
                <Animated key={action.id || index} className={`delay-500`}>
                  <ActionButton
                    href={action.link}
                    icon={getIcon(action.icon)}
                    label={action.label}
                  />
                </Animated>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
