import { Node, mergeAttributes , findParentNode } from '@tiptap/core';
import { findParentNodeOfType } from 'prosemirror-utils';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    tableFigure: {
      insertTableFigure: (options: { rows: number; cols: number; withHeaderRow?: boolean }) => ReturnType;
      updateTableWithCaption: () => ReturnType;
      removeTableCaption: () => ReturnType;
    };
  }
}

export const TableFigure = Node.create({
  name: 'tableFigure',
  group: 'block',
  content: 'tableCaption? table', // Caption first, then table
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'figure',
        getAttrs: (node) => ((node as HTMLElement).querySelector('table') ? {} : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {    
    return ['figure', mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      insertTableFigure:
        ({ rows, cols, withHeaderRow = true }) =>
        ({ commands }) => {
          const headerRow = {
            type: 'tableRow',
            content: Array.from({ length: cols }, () => ({
              type: withHeaderRow ? 'tableHeader' : 'tableCell',
              content: [{ type: 'paragraph' }],
            })),
          };

          const bodyRows = Array.from({ length: rows - 1 }, () => ({
            type: 'tableRow',
            content: Array.from({ length: cols }, () => ({
              type: 'tableCell',
              content: [{ type: 'paragraph' }],
            })),
          }));

          return commands.insertContent({
            type: 'tableFigure',
            content: [
              {
                type: 'tableCaption',
                content: [{ type: 'text', text: 'Enter table caption here...' }],
              },
              {
                type: 'table',
                content: [headerRow, ...bodyRows],
              },
            ],
          });
        },

      updateTableWithCaption:
        () =>
        ({ state, tr, dispatch }) => {
          const { selection } = state;
          const tableNode = findParentNodeOfType(state.schema.nodes.table)(selection);

          if (!tableNode) return false;

          const alreadyWrapped = findParentNode((node) => node.type.name === 'tableFigure')(selection);
          if (alreadyWrapped) return false;

          const tableFigureType = state.schema.nodes.tableFigure;
          const tableCaptionType = state.schema.nodes.tableCaption;
          if (!tableFigureType || !tableCaptionType) return false;

          const figureContent = [
            tableCaptionType.create(
              state.schema.text('Enter table caption here...')
            ),
            tableNode.node,
          ];

          tr.replaceWith(
            tableNode.pos,
            tableNode.pos + tableNode.node.nodeSize,
            tableFigureType.create({ }, figureContent),
          );

          if (dispatch) dispatch(tr);

          return true;
        },

      removeTableCaption:
        () =>
        ({ state, tr, dispatch }) => {
          const { selection } = state;
          const figure = findParentNodeOfType(state.schema.nodes.tableFigure)(selection);
          if (!figure) return false;

          // Find the table node within the figure
          let tableNode = null;

          figure.node.content.forEach((child) => {
            if (child.type.name === 'table') {
              tableNode = child;
            }
          });

          if (!tableNode) return false;

          // Replace the entire figure with just the table
          tr.replaceWith(
            figure.pos,
            figure.pos + figure.node.nodeSize,
            tableNode
          );

          if (dispatch) dispatch(tr);

          return true;
        },
    };
  },
});