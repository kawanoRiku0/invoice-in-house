import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import './global.css';
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={inter.className}
        style={{
          margin: '0 auto',
          padding: '20px',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
