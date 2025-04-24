import { type Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Roboto_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
          <div className="min-h-screen flex flex-col">
            {children} 
          </div>
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );  
}