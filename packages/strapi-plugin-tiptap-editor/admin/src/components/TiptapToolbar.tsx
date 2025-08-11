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
  MdLink,
  MdLinkOff,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

import { handleLinkCommand } from '../commands/link';
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
  disabled?: boolean;
};

interface ToolBarButtonsType {
  label: string;
  icon: IconType;
  command: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  isEnabled?: (editor: Editor) => boolean;
}

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

const BUTTONS: ToolBarButtonsType[] = [
  {
    label: 'Bold',
    icon: MdFormatBold,
    command: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive('bold'),
  },
  {
    label: 'Italic',
    icon: MdFormatItalic,
    command: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive('italic'),
  },
  {
    label: 'Strikethrough',
    icon: MdStrikethroughS,
    command: (editor: Editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor: Editor) => editor.isActive('strike'),
  },
  {
    label: 'Bullet List',
    icon: MdFormatListBulleted,
    command: (editor: Editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor: Editor) => editor.isActive('bulletList'),
  },
  {
    label: 'Ordered List',
    icon: MdFormatListNumbered,
    command: (editor: Editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor: Editor) => editor.isActive('orderedList'),
  },
  {
    label: 'Horizontal Rule',
    icon: MdRemove,
    command: (editor: Editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: (editor: Editor) => editor.isActive('horizontalRule'),
  },
  // --- Details Button ---
  {
    label: 'Set Details',
    icon: MdReadMore,
    command: (editor: Editor) => editor.chain().focus().setDetails().run(),
    isActive: (editor: Editor) => editor.isActive('details'),
  },
  {
    label: 'Unset Details',
    icon: MdClose,
    command: (editor: Editor) => editor.chain().focus().unsetDetails().run(),
    isActive: () => false,
    isEnabled: (editor: Editor) => editor.can().unsetDetails(),
  },
  {
    label: 'Link',
    icon: MdLink,
    command: handleLinkCommand,
    isActive: (editor: Editor) => editor.isActive('link'),
  },
  {
    label: 'Unset Link',
    icon: MdLinkOff,
    command: (editor: Editor) => editor.chain().focus().unsetLink().run(),
    isActive: (editor: Editor) => editor.isActive('link'),
    isEnabled: (editor: Editor): boolean => !editor.isActive('link'),
  },
];

const TiptapToolbar: React.FC<TiptapToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <ToolbarWrapper>
      <TextStyleControls editor={editor} />
      {BUTTONS.map(({ label, icon: Icon, command, isActive, isEnabled }) => (
        <ToolbarButton
          key={label}
          variant="tertiary"
          onClick={() => command(editor)}
          active={isActive(editor)}
          disabled={isEnabled && isEnabled(editor)}
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
