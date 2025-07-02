import pluginNext from '@next/eslint-plugin-next';
import { config as baseConfig } from './base.js';
import { reactConfig } from './react-internal.js';
/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJsConfig = [
  ...baseConfig,
  ...reactConfig,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
