import { cn } from '@/lib/utils';
import { Color } from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableRow } from '@tiptap/extension-table-row';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Callout,
    ContentWrapper,
    FeatureIcon,
    FeatureIconWrapper,
    IconList,
    IconListItem,
    InlineSvg,
    ServiceCard,
    ServiceGrid,
} from './extensions';
import { Toolbar } from './toolbar';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
    className?: string;
    editorClassName?: string;
    uploadEndpoint?: string;
    sessionKey?: string;
}

export function TiptapEditor({
    content,
    onChange,
    placeholder,
    className,
    editorClassName,
    uploadEndpoint,
    sessionKey,
}: TiptapEditorProps) {
    const { t } = useTranslation();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4],
                },
            }),
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline underline-offset-4 hover:text-primary/80',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full',
                },
            }),
            TableRow,
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-border bg-muted px-4 py-2 text-left font-medium',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-border px-4 py-2',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || t('Start writing...'),
            }),
            ContentWrapper,
            ServiceGrid,
            ServiceCard,
            Callout,
            IconList,
            IconListItem,
            FeatureIcon,
            FeatureIconWrapper,
            InlineSvg,
        ],
        content,
        editorProps: {
            attributes: {
                class: cn(
                    'prose prose-sm sm:prose-base dark:prose-invert min-h-[200px] max-w-none p-4 focus:outline-none',
                    '[&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6',
                    '[&_ul.list-none]:list-none [&_ul.list-none]:pl-0',
                    '[&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold',
                    '[&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold',
                    '[&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-medium',
                    '[&_h4]:mb-2 [&_h4]:text-base [&_h4]:font-medium',
                    '[&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic',
                    '[&_p]:mb-2',
                    '[&_[data-type="callout"]]:mt-4 [&_[data-type="callout"]]:rounded-xl [&_[data-type="callout"]]:border-l-4 [&_[data-type="callout"]]:border-pink-400 [&_[data-type="callout"]]:bg-gray-50 [&_[data-type="callout"]]:p-4 [&_[data-type="callout"]]:italic',
                    '[&_[data-variant]]:mb-2 [&_[data-variant]]:rounded-xl [&_[data-variant]]:p-4',
                    '[&_[data-variant="pink"]]:border [&_[data-variant="pink"]]:border-pink-100 [&_[data-variant="pink"]]:bg-pink-50/50',
                    '[&_[data-variant="white"]]:border [&_[data-variant="white"]]:border-gray-100 [&_[data-variant="white"]]:bg-white [&_[data-variant="white"]]:shadow-sm',
                    '[&_[data-variant="gray"]]:bg-gray-50',
                    editorClassName,
                ),
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div
            className={cn(
                'rounded-md border border-input bg-background',
                className,
            )}
        >
            <Toolbar
                editor={editor}
                uploadEndpoint={uploadEndpoint}
                sessionKey={sessionKey}
            />
            <EditorContent editor={editor} />
        </div>
    );
}
