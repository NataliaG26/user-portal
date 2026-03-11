import type { Metadata } from 'next';
import Providers from '@/shared/components/Providers';
import Navbar from '@/shared/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'User Portal',
  description: 'User & Posts Management Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
           <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}