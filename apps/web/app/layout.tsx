import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cislunar Viewer',
  description: 'Production-minded Artemis II mission replay and live state viewer.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
