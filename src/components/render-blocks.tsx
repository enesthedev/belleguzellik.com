import { CTABlock } from '@/domains/blocks/cta.client'
import { FeaturesBlock } from '@/domains/blocks/features.client'
import { GalleryBlock } from '@/domains/blocks/gallery.client'
import { RichTextBlock } from '@/domains/blocks/rich-text.client'
import { ServiceHeaderBlock } from '@/domains/services/blocks/service-header.client'
import { ServicesCarouselBlock } from '@/domains/services/blocks/services-carousel.server'
import { ServicesGridBlock } from '@/domains/services/blocks/services-grid.server'

import { VideoHeroBlock } from '@/domains/blocks/video-hero.client'
import { Section } from './section'

interface Block {
  blockType: string
  [key: string]: any
}

interface RenderBlocksProps {
  blocks: Block[] | null | undefined
  enableFullscreenSections?: boolean
}

const blockAriaLabels: Record<string, string> = {
  'services-carousel': 'Hizmetler',
  'services-grid': 'Hizmetler',
  'service-header': 'Hizmet Başlığı',
  'video-hero': 'Videolu Kahraman Bölümü',
  'rich-text': 'İçerik',
  gallery: 'Galeri',
  features: 'Özellikler',
}

export function RenderBlocks({ blocks, enableFullscreenSections = false }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  const renderBlock = (block: Block) => {
    switch (block.blockType) {
      case 'video-hero':
        return (
          <VideoHeroBlock
            backgroundImage={block.backgroundImage}
            backgroundVideo={block.backgroundVideo}
            actions={block.actions}
          />
        )
      case 'services-carousel':
        return <ServicesCarouselBlock heading={block.heading} description={block.description} />
      case 'services-grid':
        return <ServicesGridBlock heading={block.heading} description={block.description} />
      case 'service-header':
        return <ServiceHeaderBlock service={block.service} />
      case 'rich-text':
        return <RichTextBlock content={block.content} />
      case 'gallery':
        return <GalleryBlock images={block.images} />
      case 'features':
        return <FeaturesBlock features={block.features} />
      case 'cta':
        return (
          <CTABlock
            heading={block.heading}
            description={block.description}
            buttonText={block.buttonText}
            buttonLink={block.buttonLink}
          />
        )
      default:
        return null
    }
  }

  if (enableFullscreenSections) {
    return (
      <div
        data-scroll-snap-container
        className="h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth"
      >
        {blocks.map((block, index) => (
          <Section
            key={block.id || index}
            id={block.blockType}
            ariaLabel={blockAriaLabels[block.blockType]}
            enableFullscreen
          >
            {renderBlock(block)}
          </Section>
        ))}
      </div>
    )
  }

  return (
    <div>
      {blocks.map((block, index) => (
        <Section
          key={block.id || index}
          id={block.blockType}
          ariaLabel={blockAriaLabels[block.blockType]}
          enableFullscreen={false}
        >
          {renderBlock(block)}
        </Section>
      ))}
    </div>
  )
}
