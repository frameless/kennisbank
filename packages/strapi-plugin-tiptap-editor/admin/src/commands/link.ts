/* eslint-disable no-alert */
import type { Editor } from '@tiptap/core';

export const handleLinkCommand = (editor: Editor) => {
  const previousUrl = editor.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  if (url === null) {
    return;
  }

  if (url === '') {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  try {
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Error setting link:', e);
    window.alert(`Invalid URL: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }
};
