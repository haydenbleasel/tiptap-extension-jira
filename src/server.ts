import { Node, mergeAttributes } from '@tiptap/core';

const MediaSingle = Node.create({
  name: 'mediaSingle',
  group: 'block',
  content: 'media',
  addAttributes() {
    return {
      layout: {
        default: 'align-start',
        parseHTML: (element) => element.getAttribute('data-layout'),
        renderHTML: (attributes) => {
          return { 'data-layout': attributes.layout };
        },
      },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-layout]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0];
  },
});

const Expand = Node.create({
  name: 'expand',
  group: 'block',
  content: 'block+',
  addAttributes() {
    return {
      title: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-expand-title]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-expand-title': node.attrs.title,
      }),
      0,
    ];
  },
});

export const jiraServerExtensions = [MediaSingle, Expand];
