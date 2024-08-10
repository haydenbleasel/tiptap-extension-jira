import { Mark, Node, mergeAttributes } from '@tiptap/core';

const Strong = Mark.create({
  name: 'strong',
  parseHTML() {
    return [{ tag: 'strong' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['strong', mergeAttributes(HTMLAttributes), 0];
  },
});

const Em = Mark.create({
  name: 'em',
  parseHTML() {
    return [{ tag: 'em' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['em', mergeAttributes(HTMLAttributes), 0];
  },
});

const SubSup = Mark.create({
  name: 'subsup',
  addAttributes() {
    return {
      type: {
        default: 'sub',
        parseHTML: (element) => (element.tagName === 'SUB' ? 'sub' : 'sup'),
        renderHTML: (attributes) => {
          return { 'data-type': attributes.type };
        },
      },
    };
  },
  parseHTML() {
    return [
      { tag: 'sub', getAttrs: () => ({ type: 'sub' }) },
      { tag: 'sup', getAttrs: () => ({ type: 'sup' }) },
    ];
  },
  renderHTML({ mark, HTMLAttributes }) {
    return [mark.attrs.type, mergeAttributes(HTMLAttributes), 0];
  },
});

const TextColor = Mark.create({
  name: 'textColor',
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color,
        renderHTML: (attributes) => {
          return { style: `color: ${attributes.color}` };
        },
      },
    };
  },
  parseHTML() {
    return [{ style: 'color' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});

const Media = Node.create({
  name: 'media',
  group: 'block',
  // inline: true,
  atom: true,
  addAttributes() {
    return {
      id: { default: null },
      alt: { default: null },
      type: { default: 'file' },
      width: { default: null },
      height: { default: null },
      collection: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'img' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        src: node.attrs.id,
        alt: node.attrs.alt,
        width: node.attrs.width,
        height: node.attrs.height,
      }),
    ];
  },
});

const Panel = Node.create({
  name: 'panel',
  group: 'block',
  content: 'block+',
  addAttributes() {
    return {
      panelType: { default: 'info' },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-panel-type]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-panel-type': node.attrs.panelType,
      }),
      0,
    ];
  },
});

const HorizontalRule = Node.create({
  name: 'rule',
  group: 'block',
  parseHTML() {
    return [{ tag: 'hr' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(HTMLAttributes)];
  },
});

const DateNode = Node.create({
  name: 'date',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      timestamp: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'time[data-type="date"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'time',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'date',
        datetime: node.attrs.timestamp,
      }),
      new Date(Number.parseInt(node.attrs.timestamp)).toLocaleDateString(),
    ];
  },
});

const Status = Node.create({
  name: 'status',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      text: { default: null },
      color: { default: null },
      style: { default: '' },
      localId: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-type="status"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'status',
        style: `color: ${node.attrs.color}; ${node.attrs.style}`,
      }),
      node.attrs.text,
    ];
  },
});

const InlineCard = Node.create({
  name: 'inlineCard',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      url: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: 'a[data-type="inlineCard"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'inlineCard',
      }),
      node.attrs.url,
    ];
  },
});

const UndefinedNode = Node.create({
  name: 'undefined',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {};
  },
  parseHTML() {
    return [{ tag: 'span[data-type="undefined"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-type': 'undefined' }),
      '',
    ];
  },
});

export const jiraExtensions = [
  Strong,
  Em,
  SubSup,
  TextColor,
  Media,
  Panel,
  HorizontalRule,
  DateNode,
  Status,
  InlineCard,
  UndefinedNode,
];
