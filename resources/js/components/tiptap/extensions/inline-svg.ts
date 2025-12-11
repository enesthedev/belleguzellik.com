import { Node, mergeAttributes } from '@tiptap/core';

export interface InlineSvgOptions {
    HTMLAttributes: Record<string, unknown>;
}

export const InlineSvg = Node.create<InlineSvgOptions>({
    name: 'inlineSvg',

    group: 'inline',

    inline: true,

    atom: true,

    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },

    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: (element) => element.getAttribute('class'),
            },
            fill: {
                default: 'none',
                parseHTML: (element) => element.getAttribute('fill'),
            },
            stroke: {
                default: 'currentColor',
                parseHTML: (element) => element.getAttribute('stroke'),
            },
            viewBox: {
                default: '0 0 24 24',
                parseHTML: (element) => element.getAttribute('viewBox'),
            },
            innerHTML: {
                default: null,
                parseHTML: (element) => element.innerHTML,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'svg',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        const { innerHTML, ...attrs } = HTMLAttributes;
        const svgAttrs = mergeAttributes(this.options.HTMLAttributes, attrs);

        const span = document.createElement('span');
        span.innerHTML = `<svg ${Object.entries(svgAttrs)
            .map(([k, v]) => `${k}="${v}"`)
            .join(' ')}>${innerHTML || ''}</svg>`;

        return ['span', { class: 'inline-svg-wrapper', innerHTML: span.innerHTML }];
    },
});

