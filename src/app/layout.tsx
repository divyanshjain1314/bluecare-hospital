import { Outfit } from 'next/font/google';
import { Providers } from "./providers";
import './globals.css';
import "react-datepicker/dist/react-datepicker.css";
import { ThemeWatcher } from '@/components/ThemeWatcher';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit antialiased text-slate-900 dark:text-slate-50">
        <Providers>
          <ThemeWatcher />
          {children}
        </Providers>
      </body>
    </html>
  );
}