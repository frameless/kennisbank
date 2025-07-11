import { Box } from '@strapi/design-system';
import { Theme } from 'src/types';
import styled from 'styled-components';

export const TableControlsGrid = styled(Box)<{ theme: Theme }>`
  && {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spaces[2]};
  }
`;
