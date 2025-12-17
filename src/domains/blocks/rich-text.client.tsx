'use client'

import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface RichTextBlockProps {
  content: SerializedEditorState
}

export function RichTextBlock({ content }: RichTextBlockProps) {
  if (!content) {
    return null
  }

  return (
    <div className="px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
          <RichText data={content} />
        </div>
      </div>
    </div>
  )
}
