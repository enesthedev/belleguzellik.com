import { CTABlock } from '@/domains/blocks/cta.client'
import { FeaturesBlock } from '@/domains/blocks/features.client'
import { GalleryBlock } from '@/domains/blocks/gallery.client'
import { HeroBlock } from '@/domains/blocks/hero.client'
import { ServicesCarouselBlock } from '@/domains/services/blocks/services-carousel.server'

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
  hero: 'Ana Bölüm',
  'services-carousel': 'Hizmetler',
  gallery: 'Galeri',
  features: 'Özellikler',
  cta: 'Harekete Geçirici',
}

export function RenderBlocks({ blocks, enableFullscreenSections = false }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) return null

  const renderBlock = (block: Block) => {
    switch (block.blockType) {
      case 'hero':
        return (
          <HeroBlock
            heading={block.heading}
            subheading={block.subheading}
            backgroundImage={block.backgroundImage}
            backgroundVideo={block.backgroundVideo}
            showLogo={block.showLogo}
            actions={block.actions}
          />
        )
      case 'services-carousel':
        return <ServicesCarouselBlock heading={block.heading} description={block.description} />
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
