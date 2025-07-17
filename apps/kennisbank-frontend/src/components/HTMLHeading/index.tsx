import type { JSX, ComponentPropsWithoutRef, ElementType } from 'react';

export interface HTMLHeadingProps extends ComponentPropsWithoutRef<'h1'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  asFallback?: ElementType; // default: 'p'
}

export const HTMLHeading = ({ level = 1, asFallback: Fallback = 'p', ...props }: HTMLHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Ensure fallback if somehow invalid
  const SafeTag = /^h[1-6]$/.test(Tag) ? Tag : Fallback;

  return <SafeTag {...props} />;
};
