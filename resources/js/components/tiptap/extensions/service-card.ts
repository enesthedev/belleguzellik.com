import { Node, mergeAttributes } from '@tiptap/core';

export type CardVariant = 'pink' | 'white' | 'gray';

export interface ServiceCardOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        serviceCard: {
            insertCard: (variant: CardVariant) => ReturnType;
            setCardVariant: (variant: CardVariant) => ReturnType;
        };
    }
}

const variantClasses: Record<CardVariant, string> = {
    pink: 'bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100 h-full',
    white: 'text-center p-4 md:p-6 bg-white shadow-sm rounded-xl border border-gray-100 h-full',
    gray: 'bg-gray-50 rounded-2xl p-6 md:p-8 h-full',
};

function detectVariant(className: string): CardVariant {
    if (className.includes('bg-pink-50')) return 'pink';
    if (className.includes('bg-white') || className.includes('shadow-sm'))
        return 'white';
    if (className.includes('bg-gray-50')) return 'gray';
    return 'pink';
}

export const ServiceCard = Node.create<ServiceCardOptions>({
    name: 'serviceCard',

    group: 'block',

    content: 'block+',

    defining: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            variant: {
                default: 'pink',
                parseHTML: (element) => {
                    const className = element.getAttribute('class') || '';
                    return detectVariant(className);
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
                        className.includes('rounded-2xl') ||
                        className.includes('rounded-xl') ||
                        (className.includes('bg-') && className.includes('p-6'))
                    ) {
                        return { class: className };
                    }
                    return false;
                },
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        const variant = node.attrs.variant as CardVariant;

        return [
            'div',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: node.attrs.class || variantClasses[variant],
                'data-variant': variant,
            }),
            0,
        ];
    },

    addCommands() {
        return {
            insertCard:
                (variant: CardVariant) =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: { variant, class: variantClasses[variant] },
                        content: [
                            {
                                type: 'heading',
                                attrs: { level: 3 },
                                content: [
                                    { type: 'text', text: 'Kart Başlığı' },
                                ],
                            },
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: 'Kart içeriği buraya gelecek...',
                                    },
                                ],
                            },
                        ],
                    });
                },
            setCardVariant:
                (variant: CardVariant) =>
                ({ commands }) => {
                    return commands.updateAttributes(this.name, {
                        variant,
                        class: variantClasses[variant],
                    });
                },
        };
    },
});
