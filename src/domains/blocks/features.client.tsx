import * as LucideIcons from 'lucide-react'

interface Feature {
  icon?: string
  title: string
  description?: string
}

interface FeaturesBlockProps {
  features?: Feature[]
}

export function FeaturesBlock({ features }: FeaturesBlockProps) {
  if (!features || features.length === 0) return null

  return (
    <div className="mx-auto max-w-4xl flex flex-col justify-center py-6">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
            ? (LucideIcons[feature.icon as keyof typeof LucideIcons] as LucideIcons.LucideIcon)
            : null

          return (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border bg-card p-6 text-center shadow-sm"
            >
              {IconComponent && (
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <IconComponent className="h-6 w-6 text-primary" />
                </div>
              )}
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              {feature.description && (
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
