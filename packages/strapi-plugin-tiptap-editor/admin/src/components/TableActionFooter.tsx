import { Box } from '@strapi/design-system';
import { Theme } from 'src/types';
import styled from 'styled-components';

export const TableActionFooter = styled(Box)<{ theme: Theme }>`
  padding-block-start: ${({ theme }) => theme.spaces[2]};
  margin-block-top: ${({ theme }) => theme.spaces[2]};
  border-block-start-style: solid;
  border-block-start-width: 1px;
  border-block-start-color: ${({ theme }) => theme.colors.neutral200};
`;
