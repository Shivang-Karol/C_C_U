import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AICC — AI Convoy Command',
  description:
    'Hackathon-ready frontend for the AI-Driven Convoy & Mobility Command System.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slateDepth">
      <body className={`${inter.variable} antialiased bg-slateDepth text-textNeutral`}>
        {children}
      </body>
    </html>
  );
}
