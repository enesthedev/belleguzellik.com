import { Node, mergeAttributes } from '@tiptap/core';

export interface ServiceGridOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        serviceGrid: {
            insertGrid: (cols: 2 | 3) => ReturnType;
        };
    }
}

export const ServiceGrid = Node.create<ServiceGridOptions>({
    name: 'serviceGrid',

    group: 'block',

    content: 'serviceCard+',

    defining: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            cols: {
                default: 2,
                parseHTML: (element) => {
                    const className = element.getAttribute('class') || '';
                    if (className.includes('md:grid-cols-3')) return 3;
                    if (className.includes('md:grid-cols-2')) return 2;
                    return 2;
                },
            },
            class: {
                default: null,
                parseHTML: (element) => element.getAttribute('class'),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: (element) => {
                    const el = element as HTMLElement;
                    const className = el.getAttribute('class') || '';
                    if (
                        className.includes('grid') &&
                        className.includes('grid-cols')
                    ) {
                        return { class: className };
                    }
                    return false;
                },
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        const cols = node.attrs.cols as number;
        // Mobil: 1 sütun, Tablet (md): 2 sütun, Masaüstü (lg): Belirtilen sütun sayısı (eğer 3 ise)
        const gridClass =
            cols === 3
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 md:grid-cols-2';

        const baseClass = `my-8 grid ${gridClass} gap-6 md:gap-${cols === 3 ? '6' : '8'}`;

        return [
            'div',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: node.attrs.class || baseClass,
            }),
            0,
        ];
    },

    addCommands() {
        return {
            insertGrid:
                (cols: 2 | 3) =>
                ({ commands }) => {
                    const cards = Array.from({ length: cols }, () => ({
                        type: 'serviceCard',
                        attrs: { variant: 'pink' },
                        content: [
                            {
                                type: 'heading',
                                attrs: { level: 3 },
                                content: [{ type: 'text', text: 'Başlık' }],
                            },
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'İçerik buraya gelecek...',
                                    },
                                ],
                            },
                        ],
                    }));

                    return commands.insertContent({
                        type: this.name,
                        attrs: {
                            cols,
                            class: `my-8 grid ${cols === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} gap-6 md:gap-${cols === 3 ? '6' : '8'}`,
                        },
                        content: cards,
                    });
                },
        };
    },
});
