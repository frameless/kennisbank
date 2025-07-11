import React from 'react';
import { Editor } from '@tiptap/react';
import styled from 'styled-components';
import { Button } from '@strapi/design-system';
import {
  MdFormatBold,
  MdFormatItalic,
  MdStrikethroughS,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdReadMore,
  MdClose,
  MdRemove,
} from 'react-icons/md';

import { Theme } from '../types';

import { TableControls } from './TableControls';
import { TextStyleControls } from './TextStyleControls';

const ToolbarWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spaces[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[3]};
  background: ${({ theme }) => theme.colors.neutral100};
`;

type ToolbarButtonProps = {
  active: boolean;
  theme: Theme;
};

const ToolbarButton = styled(Button)<ToolbarButtonProps>`
  color: ${({ active, theme }) => (active ? theme.colors.primary600 : theme.colors.neutral1000)};
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes[4]};
  &:hover {
    background: ${({ theme }) => theme.colors.neutral150};
  }
`;

type TiptapToolbarProps = {
  editor: Editor | null;
};

const BUTTONS = [
  {
    label: 'Bold',
    icon: MdFormatBold,
    command: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive('bold'),
    isEnabled: (editor: Editor) => editor.can().toggleBold(),
  },
  {
    label: 'Italic',
    icon: MdFormatItalic,
    command: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive('italic'),
    isEnabled: (editor: Editor) => editor.can().toggleItalic(),
  },
  {
    label: 'Strikethrough',
    icon: MdStrikethroughS,
    command: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive('strike'),
    isEnabled: (editor: Editor) => editor.can().toggleStrike(),
  },
  {
    label: 'Bullet List',
    icon: MdFormatListBulleted,
    command: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
    isEnabled: (editor: Editor) => editor.can().toggleBulletList(),
  },
  {
    label: 'Ordered List',
    icon: MdFormatListNumbered,
    command: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
    isEnabled: (editor: Editor) => editor.can().toggleOrderedList(),
  },
  {
    label: 'Horizontal Rule',
    icon: MdRemove,
    command: (editor: Editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: (editor: Editor) => editor.isActive('horizontalRule'),
    isEnabled: (editor: Editor) => editor.can().setHorizontalRule(),
  },
  // --- Details Button ---
  {
    label: 'Set Details',
    icon: MdReadMore,
    command: (editor: Editor) => editor.chain().focus().setDetails().run(),
    isActive: (editor: Editor) => editor.isActive('details'),
    isEnabled: (editor: Editor) => editor.can().setDetails(),
  },
  {
    label: 'Unset Details',
    icon: MdClose,
    command: (editor: Editor) => editor.chain().focus().unsetDetails().run(),
    isActive: () => false,
    isEnabled: (editor: Editor) => editor.can().unsetDetails(),
  },
];

const TiptapToolbar: React.FC<TiptapToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <ToolbarWrapper>
      <TextStyleControls editor={editor} />
      {BUTTONS.map(({ label, icon: Icon, command, isActive }) => (
        <ToolbarButton
          key={label}
          variant="tertiary"
          onClick={() => command(editor)}
          active={isActive(editor)}
          aria-label={label}
          type="button"
          startIcon={<Icon />}
        >
          {label}
        </ToolbarButton>
      ))}
      <TableControls editor={editor} />
    </ToolbarWrapper>
  );
};

export default TiptapToolbar;
