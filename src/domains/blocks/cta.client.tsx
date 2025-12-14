import Link from 'next/link'

interface CTABlockProps {
  heading: string
  description?: string
  buttonText: string
  buttonLink: string
}

export function CTABlock({ heading, description, buttonText, buttonLink }: CTABlockProps) {
  return (
    <div className="flex flex-col justify-center py-12">
      <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">{description}</p>
        )}
        <Link
          href={buttonLink}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  )
}
