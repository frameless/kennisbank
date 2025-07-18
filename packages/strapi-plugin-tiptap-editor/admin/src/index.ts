// import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

import '@utrecht/component-library-css';
import '@utrecht/component-library-css/dist/html.css';
import '@utrecht/design-tokens/dist/index.css';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
    app.customFields.register({
      name: 'tiptap-editor',
      pluginId: 'tiptap-editor',
      type: 'richtext',
      icon: PluginIcon,
      intlLabel: {
        id: 'tiptap-editor.label',
        defaultMessage: 'TipTap',
      },
      intlDescription: {
        id: 'tiptap-editor.description',
        defaultMessage: 'Rich text editor',
      },
      components: {
        Input: async () =>
          import('./components/Input').then((module) => ({
            default: module.TiptapEditorInput,
          })),
      },

    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      }),
    );
  },
};
