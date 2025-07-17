import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@utrecht/component-library-css';
import '@utrecht/design-tokens/dist/index.css';

import './globals.css';
import { Page, PageHeader, SearchBar } from '@/components';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Kennisbank',
  description: 'Kennisbank Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="utrecht-theme utrecht-document">
      <Page>
        <PageHeader>
          <SearchBar />
        </PageHeader>
      </Page>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <div className="utrecht-page-layout">
          <div className="utrecht-page-body">
            <div className="utrecht-page-body__content">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
