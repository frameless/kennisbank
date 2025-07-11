import { Button } from '@strapi/design-system';
import { Theme } from 'src/types';
import styled from 'styled-components';

interface GoBackButtonProps {
  theme: Theme;
}

export const GoBackButton = styled(Button)<GoBackButtonProps>`
  padding-block: ${({ theme }) => theme.spaces[1]};
  padding-inline: ${({ theme }) => theme.spaces[1]};
  margin-inline-end: ${({ theme }) => theme.spaces[2]};
`;
