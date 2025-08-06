import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { MdArrowBack } from 'react-icons/md';

interface BackLinkProps {
  href: string;
}

export const BackLink = ({ children, href }: PropsWithChildren<BackLinkProps>) => {
  return (
    <Link className="utrecht-link utrecht-link--html-a" href={href}>
      <MdArrowBack />
      {children}
    </Link>
  );
};
