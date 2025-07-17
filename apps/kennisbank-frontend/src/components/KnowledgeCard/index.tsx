import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';

import { Icon, type IconName } from '../Icon';
import { Heading, Paragraph } from '../index';
import './styles.css';

export interface KnowledgeCard extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  title: string;
  description: string;
  icon: IconName;
}

export const KnowledgeCard = forwardRef<HTMLElement, KnowledgeCard>(
  ({ title, description, icon, ...restProps }, ref: ForwardedRef<HTMLElement>) => (
    <article ref={ref} className="frameless-knowledge-card" {...restProps}>
      {icon && <Icon name={icon} className="frameless-knowledge-card__icon" />}
      {title && (
        <Heading level={2} className="frameless-knowledge-card__title">
          {title}
        </Heading>
      )}
      {description && <Paragraph className="frameless-knowledge-card__description">{description}</Paragraph>}
    </article>
  ),
);
KnowledgeCard.displayName = 'KnowledgeCard';
