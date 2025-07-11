import styled from 'styled-components';
import { Box } from '@strapi/design-system';
import { Theme } from 'src/types';

interface TableActionIconProps {
  theme: Theme;
}

export const TableActionIcon = styled(Box)<TableActionIconProps>`
  color: inherit;
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;
