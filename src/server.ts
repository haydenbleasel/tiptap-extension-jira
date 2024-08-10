import { Node, mergeAttributes } from '@tiptap/core';

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
