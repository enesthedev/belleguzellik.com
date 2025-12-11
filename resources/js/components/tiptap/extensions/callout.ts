import { Node, mergeAttributes } from '@tiptap/core';

export interface CalloutOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        callout: {
            insertCallout: () => ReturnType;
        };
    }
}

export const Callout = Node.create<CalloutOptions>({
    name: 'callout',

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
            class: {
                default: 'mt-8 p-6 bg-gray-50 rounded-xl border-l-4 border-pink-400 italic text-gray-600',
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
                    if (className.includes('border-l-4')) {
                        return { class: className };
                    }
                    return false;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                'data-type': 'callout',
            }),
            0,
        ];
    },

    addCommands() {
        return {
            insertCallout:
                () =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: '"Buraya bir alıntı veya önemli not yazabilirsiniz."',
                                    },
                                ],
                            },
                        ],
                    });
                },
        };
    },
});

