import { forwardRef, type DetailedHTMLProps, type ForwardedRef, type HTMLAttributes } from 'react';
import '@utrecht/component-library-css/dist/html.css';
interface MarkdownProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  content: string;
}

export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(
  ({ content }, ref: ForwardedRef<HTMLDivElement>) =>
    content && <div ref={ref} dangerouslySetInnerHTML={{ __html: content }} className="utrecht-html" />,
);
Markdown.displayName = 'Markdown';
