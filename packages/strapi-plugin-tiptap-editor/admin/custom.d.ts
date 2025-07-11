import type { Theme } from '@strapi/design-system';
import 'styled-components';

declare module '@strapi/design-system/*';
declare module '@strapi/design-system';

declare module 'styled-components' {
  export type DefaultTheme = Theme
}
