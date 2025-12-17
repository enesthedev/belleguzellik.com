import type { Media } from '@/payload-types'

interface GalleryBlockProps {
  images?: Array<{
    image?: Media | string
  }>
}

export function GalleryBlock({ images }: GalleryBlockProps) {
  if (!images || images.length === 0) return null

  return (
    <div className="flex flex-col justify-center py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((item, index) => {
          const image = typeof item.image === 'object' ? item.image : null
          if (!image?.url) return null

          return (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
            >
              <img
                src={image.url}
                alt={image.alt || ''}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
