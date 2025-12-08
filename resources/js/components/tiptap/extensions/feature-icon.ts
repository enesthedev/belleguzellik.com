import { Node, mergeAttributes } from '@tiptap/core';

export interface FeatureIconOptions {
    HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        featureIcon: {
            insertFeatureCard: (iconType?: string) => ReturnType;
        };
    }
}

const icons: Record<string, string> = {
    clock: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
    shield: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`,
    palette: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>`,
    check: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
    star: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>`,
};

export const FeatureIconWrapper = Node.create({
    name: 'featureIconWrapper',

    group: 'block',

    content: 'block+',

    atom: false,

    addAttributes() {
        return {
            class: {
                default: 'w-12 h-12 mx-auto bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4',
                parseHTML: (element) => element.getAttribute('class'),
            },
            icon: {
                default: 'check',
                parseHTML: (element) => {
                    const svg = element.querySelector('svg');
                    if (!svg) return 'check';
                    const path = svg.querySelector('path');
                    if (!path) return 'check';
                    const d = path.getAttribute('d') || '';
                    if (d.includes('M12 8v4l3 3')) return 'clock';
                    if (d.includes('m5.618-4.016')) return 'shield';
                    if (d.includes('M7 21a4 4 0')) return 'palette';
                    if (d.includes('M11.049 2.927')) return 'star';
                    return 'check';
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
                        className.includes('rounded-full') &&
                        className.includes('flex') &&
                        className.includes('items-center') &&
                        className.includes('justify-center')
                    ) {
                        return { class: className };
                    }
                    return false;
                },
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        const iconType = (node.attrs.icon as string) || 'check';
        const iconHtml = icons[iconType] || icons.check;

        return [
            'div',
            mergeAttributes(HTMLAttributes, { 'data-icon': iconType }),
            ['span', { innerHTML: iconHtml }],
        ];
    },
});

export const FeatureIcon = Node.create<FeatureIconOptions>({
    name: 'featureIcon',

    group: 'block',

    content: 'featureIconWrapper? heading paragraph',

    defining: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            class: {
                default: 'text-center p-6 bg-white shadow-sm rounded-xl border border-gray-100',
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
                        className.includes('text-center') &&
                        className.includes('p-6') &&
                        className.includes('rounded-xl')
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
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                'data-type': 'feature-card',
            }),
            0,
        ];
    },

    addCommands() {
        return {
            insertFeatureCard:
                (iconType = 'check') =>
                ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        content: [
                            {
                                type: 'featureIconWrapper',
                                attrs: { icon: iconType },
                            },
                            {
                                type: 'heading',
                                attrs: { level: 4 },
                                content: [{ type: 'text', text: 'Özellik Başlığı' }],
                            },
                            {
                                type: 'paragraph',
                                content: [{ type: 'text', text: 'Özellik açıklaması buraya gelecek.' }],
                            },
                        ],
                    });
                },
        };
    },
});

