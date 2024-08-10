import * as Accordion from '@repo/design-system/components/accordion';
import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

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
  addNodeView() {
    return ReactNodeViewRenderer(() => {
      return (
        <div className="pointer-events-none border flex aspect-video w-full select-none items-center justify-center rounded-lg bg-card">
          <p>Sorry, we can't render images from Jira just yet.</p>
        </div>
      );
    });
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
  addNodeView() {
    return ReactNodeViewRenderer(
      ({
        node,
      }: {
        node: {
          type: string;
          attrs: {
            title: string;
          };
          content: {
            content: {
              textContent: string;
            }[];
          };
        };
      }) => (
        <NodeViewWrapper>
          <Accordion.Accordion type="single" collapsible>
            <Accordion.AccordionItem value={node.attrs.title}>
              <Accordion.AccordionTrigger>
                {node.attrs.title}
              </Accordion.AccordionTrigger>
              <Accordion.AccordionContent>
                {node.content.content.map((child) => (
                  <div key={child.textContent}>{child.textContent}</div>
                ))}
              </Accordion.AccordionContent>
            </Accordion.AccordionItem>
          </Accordion.Accordion>
        </NodeViewWrapper>
      )
    );
  },
});

export const jiraClientExtensions = [MediaSingle, Expand];
