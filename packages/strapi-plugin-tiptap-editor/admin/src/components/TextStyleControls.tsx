import { SingleSelect, SingleSelectOption } from '@strapi/design-system';
import type { Editor } from '@tiptap/core';
import { useEffect, useState } from 'react';

const textStyles = [
  { label: 'Paragraph', value: 'paragraph' },
  { label: 'Lead Paragraph', value: 'lead' },
  { label: 'Heading 1', value: 'heading-1' },
  { label: 'Heading 2', value: 'heading-2' },
  { label: 'Heading 3', value: 'heading-3' },
  { label: 'Heading 4', value: 'heading-4' },
  { label: 'Heading 5', value: 'heading-5' },
  { label: 'Heading 6', value: 'heading-6' },
];
export const TextStyleControls = ({ editor }: { editor: Editor }) => {
  const [selectedStyle, setSelectedStyle] = useState<string | number | null>('paragraph');

  const handleTextStyleChange = (value: string | number | null) => {
    setSelectedStyle(value);
    if (editor) {
      editor.chain().focus().setParagraph().run();
      switch (value) {
        case 'heading-1':
          editor.chain().focus().setHeading({ level: 1 }).run();
          break;
        case 'heading-2':
          editor.chain().focus().setHeading({ level: 2 }).run();
          break;
        case 'heading-3':
          editor.chain().focus().setHeading({ level: 3 }).run();
          break;
        case 'heading-4':
          editor.chain().focus().setHeading({ level: 4 }).run();
          break;
        case 'heading-5':
          editor.chain().focus().setHeading({ level: 5 }).run();
          break;
        case 'heading-6':
          editor.chain().focus().setHeading({ level: 6 }).run();
          break;
        case 'lead':
          editor.chain().focus().setLeadParagraph().run();
          break;
        default:
          editor.chain().focus().setParagraph().run();
      }
    }
  };

  // Detect active style on selection change
  useEffect(() => {
    if (!editor) return;

    const activeStyle = editor.getAttributes('heading')?.level
      ? `heading-${editor.getAttributes('heading').level}`
      : editor.isActive('lead')
        ? 'lead'
        : 'paragraph';

    setSelectedStyle(activeStyle);
  }, [editor, editor?.state.selection]);

  return (
    <SingleSelect
      size="S"
      placeholder="Select style"
      value={selectedStyle}
      onChange={(value) => handleTextStyleChange(value)}
      clearLabel="Clear"
    >
      {textStyles.map((style) => (
        <SingleSelectOption key={style.value} value={style.value}>
          {style.label}
        </SingleSelectOption>
      ))}
    </SingleSelect>
  );
};
