import styled from 'styled-components';
import { Typography } from '@strapi/design-system';
import { Theme } from 'src/types';

export const TableActionLabel = styled(Typography)<{ theme: Theme; focusedIndex?: number; index?: number }>`
  color: inherit;
  font-weight: ${({ focusedIndex, index, theme }) =>
    focusedIndex === index ? theme.fontWeights.semiBold : theme.fontWeights.regular};
  text-align: center;
`;
