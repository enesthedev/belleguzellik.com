import { cn } from '@/lib/utils';

interface TiptapRendererProps {
    content: string | null;
    className?: string;
}

export function TiptapRenderer({ content, className }: TiptapRendererProps) {
    if (!content) return null;

    return (
        <div
            className={cn(
                'prose prose-sm sm:prose-base dark:prose-invert max-w-none',
                '[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6',
                '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4',
                '[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3',
                '[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-2',
                '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic',
                '[&_p]:mb-2',
                '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80',
                '[&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-auto',
                '[&_table]:border-collapse [&_table]:table-auto [&_table]:w-full',
                '[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium',
                '[&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-2',
                className,
            )}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}





