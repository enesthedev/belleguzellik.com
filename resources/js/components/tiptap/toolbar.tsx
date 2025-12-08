import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Toggle } from '@/components/ui/toggle';
import { type Editor } from '@tiptap/react';
import axios from 'axios';
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    CheckSquare,
    Code,
    Grid2X2,
    Grid3X3,
    Heading1,
    Heading2,
    Heading3,
    Image,
    Italic,
    LayoutGrid,
    Link,
    List,
    ListOrdered,
    Loader2,
    MessageSquareQuote,
    Quote,
    Redo,
    Square,
    Strikethrough,
    Table,
    Undo,
} from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CardVariant } from './extensions';

interface ToolbarProps {
    editor: Editor | null;
    uploadEndpoint?: string;
    sessionKey?: string;
}

export function Toolbar({ editor, uploadEndpoint, sessionKey }: ToolbarProps) {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt(t('Enter URL'), previousUrl);

        if (url === null) return;

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    }, [editor, t]);

    const handleImageUpload = useCallback(
        async (file: File) => {
            if (!editor || !uploadEndpoint || !sessionKey) return;

            setIsUploading(true);

            try {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('session_key', sessionKey);

                const response = await axios.post(uploadEndpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.url) {
                    editor.chain().focus().setImage({ src: response.data.url }).run();
                }
            } catch (error) {
                console.error('Image upload failed:', error);
            } finally {
                setIsUploading(false);
            }
        },
        [editor, uploadEndpoint, sessionKey],
    );

    const addImage = useCallback(() => {
        if (!editor) return;

        if (uploadEndpoint && sessionKey) {
            fileInputRef.current?.click();
        } else {
            const url = window.prompt(t('Enter image URL'));
            if (url) {
                editor.chain().focus().setImage({ src: url }).run();
            }
        }
    }, [editor, uploadEndpoint, sessionKey, t]);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                handleImageUpload(file);
            }
            event.target.value = '';
        },
        [handleImageUpload],
    );

    const insertTable = useCallback(() => {
        if (!editor) return;

        editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
    }, [editor]);

    const insertGrid = useCallback(
        (cols: 2 | 3) => {
            if (!editor) return;
            editor.chain().focus().insertGrid(cols).run();
        },
        [editor],
    );

    const insertCard = useCallback(
        (variant: CardVariant) => {
            if (!editor) return;
            editor.chain().focus().insertCard(variant).run();
        },
        [editor],
    );

    const insertCallout = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().insertCallout().run();
    }, [editor]);

    const insertIconList = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().insertIconList().run();
    }, [editor]);

    if (!editor) return null;

    return (
        <div className="flex flex-wrap items-center gap-1 border-b border-input bg-muted/30 p-2">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            <Toggle
                size="sm"
                pressed={editor.isActive('bold')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
                aria-label={t('Bold')}
            >
                <Bold className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('italic')}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                aria-label={t('Italic')}
            >
                <Italic className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('strike')}
                onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                }
                aria-label={t('Strikethrough')}
            >
                <Strikethrough className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('code')}
                onPressedChange={() =>
                    editor.chain().focus().toggleCode().run()
                }
                aria-label={t('Code')}
            >
                <Code className="size-4" />
            </Toggle>

            <div className="mx-1 h-6 w-px bg-border" />

            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label={t('Heading 1')}
            >
                <Heading1 className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label={t('Heading 2')}
            >
                <Heading2 className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                aria-label={t('Heading 3')}
            >
                <Heading3 className="size-4" />
            </Toggle>

            <div className="mx-1 h-6 w-px bg-border" />

            <Toggle
                size="sm"
                pressed={editor.isActive('bulletList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
                aria-label={t('Bullet List')}
            >
                <List className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('orderedList')}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                aria-label={t('Ordered List')}
            >
                <ListOrdered className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive('blockquote')}
                onPressedChange={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
                aria-label={t('Quote')}
            >
                <Quote className="size-4" />
            </Toggle>

            <div className="mx-1 h-6 w-px bg-border" />

            <Toggle
                size="sm"
                pressed={editor.isActive('link')}
                onPressedChange={setLink}
                aria-label={t('Link')}
            >
                <Link className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                onPressedChange={addImage}
                disabled={isUploading}
                aria-label={t('Image')}
            >
                {isUploading ? (
                    <Loader2 className="size-4 animate-spin" />
                ) : (
                    <Image className="size-4" />
                )}
            </Toggle>

            <Toggle
                size="sm"
                onPressedChange={insertTable}
                aria-label={t('Table')}
            >
                <Table className="size-4" />
            </Toggle>

            <div className="mx-1 h-6 w-px bg-border" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Toggle size="sm" aria-label={t('Layout Components')}>
                        <LayoutGrid className="size-4" />
                    </Toggle>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => insertGrid(2)}>
                        <Grid2X2 className="mr-2 size-4" />
                        {t('2 Column Grid')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertGrid(3)}>
                        <Grid3X3 className="mr-2 size-4" />
                        {t('3 Column Grid')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => insertCard('pink')}>
                        <Square className="mr-2 size-4 text-pink-500" />
                        {t('Pink Card')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertCard('white')}>
                        <Square className="mr-2 size-4" />
                        {t('White Card')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => insertCard('gray')}>
                        <Square className="mr-2 size-4 text-gray-500" />
                        {t('Gray Card')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={insertCallout}>
                        <MessageSquareQuote className="mr-2 size-4" />
                        {t('Callout')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={insertIconList}>
                        <CheckSquare className="mr-2 size-4" />
                        {t('Icon List')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="mx-1 h-6 w-px bg-border" />

            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('left').run()
                }
                aria-label={t('Align Left')}
            >
                <AlignLeft className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('center').run()
                }
                aria-label={t('Align Center')}
            >
                <AlignCenter className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('right').run()
                }
                aria-label={t('Align Right')}
            >
                <AlignRight className="size-4" />
            </Toggle>

            <div className="mx-1 h-6 w-px bg-border" />

            <Toggle
                size="sm"
                onPressedChange={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                aria-label={t('Undo')}
            >
                <Undo className="size-4" />
            </Toggle>

            <Toggle
                size="sm"
                onPressedChange={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                aria-label={t('Redo')}
            >
                <Redo className="size-4" />
            </Toggle>
        </div>
    );
}
