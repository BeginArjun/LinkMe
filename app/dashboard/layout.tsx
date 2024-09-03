import { Inter } from 'next/font/google';
import Hierarchy from './hierarchy';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard | LINKME - Link In Bio Solution',
  description: 'LINKME is a link in bio solution for creators, influencers, and businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} isolate`}>
        <Hierarchy>
          {children}
        </Hierarchy>
      </body>
    </html>
  );
}