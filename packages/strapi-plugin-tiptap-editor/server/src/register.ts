import { Core } from '@strapi/strapi';

// import { PLUGIN_ID } from './pluginId';
export const PLUGIN_ID = 'tiptap-editor';
export default ({ strapi }: { strapi: Core.Strapi }) => {
  strapi.customFields.register({
    name: 'tiptap-editor',
    plugin: PLUGIN_ID,
    type: 'richtext',
  });
};
// Error: Could not find Custom Field: plugin::tiptap-editor.tiptap-editor 