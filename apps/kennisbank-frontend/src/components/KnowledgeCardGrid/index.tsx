import { DetailedHTMLProps, ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import './styles.css';

export const KnowledgeCardGrid = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>(({ children, ...restProps }, ref: ForwardedRef<HTMLDivElement>) => (
  <div ref={ref} className="frameless-knowledge-card-grid" {...restProps}>
    {children}
  </div>
));

KnowledgeCardGrid.displayName = 'KnowledgeCardGrid';
