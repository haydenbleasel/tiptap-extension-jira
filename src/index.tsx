import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

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
