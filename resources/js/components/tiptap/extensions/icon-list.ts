import { Node, mergeAttributes } from '@tiptap/core';

export interface IconListOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        iconList: {
            insertIconList: () => ReturnType;
        };
    }
}

const checkIconSvg = `<svg class="w-5 h-5 text-pink-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

export const IconList = Node.create<IconListOptions>({
    name: 'iconList',

    group: 'block',

    content: 'iconListItem+',

    defining: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            class: {
                default: 'list-none space-y-2 pl-0',
                parseHTML: (element) => element.getAttribute('class'),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'ul',
                getAttrs: (element) => {
                    const el = element as HTMLElement;
                    const className = el.getAttribute('class') || '';
                    if (className.includes('list-none')) {
                        return { class: className };
                    }
                    return false;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    addCommands() {
        return {
            insertIconList:
                () =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        content: [
                            {
                                type: 'iconListItem',
                                content: [{ type: 'text', text: 'Liste öğesi 1' }],
                            },
                            {
                                type: 'iconListItem',
                                content: [{ type: 'text', text: 'Liste öğesi 2' }],
                            },
                            {
                                type: 'iconListItem',
                                content: [{ type: 'text', text: 'Liste öğesi 3' }],
                            },
                        ],
                    });
                },
        };
    },
});

export const IconListItem = Node.create({
    name: 'iconListItem',

    group: 'block',

    content: 'inline*',

    defining: true,

    addAttributes() {
        return {
            class: {
                default: 'flex items-center text-gray-600',
                parseHTML: (element) => element.getAttribute('class'),
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'li',
                getAttrs: (element) => {
                    const el = element as HTMLElement;
                    const className = el.getAttribute('class') || '';
                    if (className.includes('flex') && className.includes('items-center')) {
                        return { class: className };
                    }
                    return false;
                },
                contentElement: (element) => {
                    const el = element as HTMLElement;
                    const svg = el.querySelector('svg');
                    if (svg) {
                        const textNode = document.createDocumentFragment();
                        el.childNodes.forEach((node) => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                textNode.appendChild(node.cloneNode(true));
                            }
                        });
                    }
                    return el;
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'li',
            mergeAttributes(HTMLAttributes),
            ['span', { class: 'inline-flex', innerHTML: checkIconSvg }],
            ['span', { class: 'flex-1' }, 0],
        ];
    },
});

