import { Typography } from '@strapi/design-system';
import { Theme } from 'src/types';
import styled from 'styled-components';

export const TableActionFooterText = styled(Typography)<{ theme: Theme }>`
  color: ${({ theme }) => theme.colors.neutral500};
  font-size: 10px;
  text-align: center;
  font-style: italic;
`;
