import React, { useRef, useEffect, forwardRef, useCallback } from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { DesignSystemProvider, Field, Flex, useComposedRefs } from '@strapi/design-system';
import { type InputProps, useField } from '@strapi/strapi/admin';
// import { useIntl } from 'react-intl';
import Details from '@tiptap/extension-details';
import DetailsContent from '@tiptap/extension-details-content';
import DetailsSummary from '@tiptap/extension-details-summary';
import BulletList from '@tiptap/extension-bullet-list';
import Placeholder from '@tiptap/extension-placeholder';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

import { TableCaption } from '../extensions/TableCaption';
import { TableFigure } from '../extensions/TableFigure';
import { LeadParagraph } from '../extensions/LeadParagraph';

import TiptapToolbar from './TiptapToolbar';
import { EditorBox } from './EditorBox';

export const getTrad = (id: string) => `tiptap-editor.${id}`;

type TiptapEditorInputProps = InputProps & {
  labelAction?: React.ReactNode;
};

export const TiptapEditorInput = forwardRef<HTMLDivElement, TiptapEditorInputProps>(
  ({ name, label, labelAction, required, hint, disabled }, forwardedRef) => {
    const field = useField(name);
    const { value = '', error, onChange } = field;
    // const { formatMessage } = useIntl();

    const localRef = useRef<HTMLDivElement>(null);
    const composedRef = useComposedRefs(forwardedRef, localRef);

    const handleUpdate = useCallback(
      ({ editor }: { editor: Editor }) => {
        onChange(name, editor.getHTML());
      },
      [name, onChange],
    );

    const editor = useEditor({
      extensions: [
        StarterKit,
        Document,
        Heading,
        Paragraph,
        HorizontalRule,
        LeadParagraph,
        Details.configure({
          persist: true,
          HTMLAttributes: {
            class: 'details',
          },
        }),
        DetailsSummary,
        DetailsContent,
        BulletList,
        ListItem,
        Placeholder.configure({
          includeChildren: true,
          placeholder: ({ node }) => {
            if (node.type.name === 'detailsSummary') {
              return 'Type something...';
            }

            return '';
          },
        }),
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        TableCaption,
        TableFigure,
      ],
      content: value,
      editable: !disabled,
      onUpdate: handleUpdate,
      injectCSS: false,
      editorProps: {
        attributes: {
          class: 'utrecht-html utrecht-theme utrecht-document',
        },
      },
    });

    useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value, false);
      }
    }, [editor, value]);

    useEffect(() => {
      return () => {
        editor?.destroy();
      };
    }, [editor]);

    return (
      <DesignSystemProvider>
        <Field.Root name={name} id={name} error={error} hint={hint} required={required}>
          <Flex direction="column" alignItems="stretch" gap={1}>
            <Field.Label action={labelAction}>{label}</Field.Label>
            <TiptapToolbar editor={editor} />
            <EditorBox ref={composedRef}>{editor && <EditorContent editor={editor} />}</EditorBox>
            <Field.Hint />
            <Field.Error />
          </Flex>
        </Field.Root>
      </DesignSystemProvider>
    );
  },
);

TiptapEditorInput.displayName = 'TiptapEditorInput';
