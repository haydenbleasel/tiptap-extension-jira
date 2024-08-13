import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

export const MediaSingleClient = Node.create({
  name: 'mediaSingle',
  group: 'block',
  content: 'media',
  addAttributes() {
    return {
      layout: {
        default: 'align-start',
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        parseHTML: (element) => element.getAttribute('data-layout'),
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        renderHTML: (attributes) => {
          return { 'data-layout': attributes.layout };
        },
      },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'div[data-layout]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0];
  },
  addNodeView() {
    return ReactNodeViewRenderer(() => {
      return (
        <NodeViewWrapper>
          <div className="pointer-events-none border flex aspect-video w-full select-none items-center justify-center rounded-lg bg-card">
            <p>Sorry, we can't render images from Jira just yet.</p>
          </div>
        </NodeViewWrapper>
      );
    });
  },
});
