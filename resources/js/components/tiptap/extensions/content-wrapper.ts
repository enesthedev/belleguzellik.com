import { Node, mergeAttributes } from '@tiptap/core';

export const ContentWrapper = Node.create({
    name: 'contentWrapper',

    group: 'block',

    content: 'block+',

    defining: true,

    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: (element) => element.getAttribute('class'),
                renderHTML: (attributes) => {
                    if (!attributes.class) return {};
                    return { class: attributes.class };
                },
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
                        className.includes('space-y-') ||
                        className.includes('prose')
                    ) {
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
            mergeAttributes(HTMLAttributes),
            0,
        ];
    },
});

