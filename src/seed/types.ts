export interface MediaConfig {
  filename: string
  alt: string
  mimeType: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface ServiceSeedData {
  name: string
  description: string
  duration: number
  image: MediaConfig
  richTextParagraphs: string[]
  features: Feature[]
  richTextParagraphsAfterFeatures: string[]
}
