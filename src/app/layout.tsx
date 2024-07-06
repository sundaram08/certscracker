// RootLayout.tsx
'use client'
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { usePathname } from 'next/navigation';
import path from "path";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const showLayout = pathname !== '/login' && pathname!=="/" && pathname!=="/signup";
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
      <div className="flex flex-col h-full">
          <div className="fixed">{showLayout && <Navbar/>}</div>
          <div className="flex-1 h-full overflow-y-auto">
            <Toaster/>
            {children}
          </div>
        </div>
        </SessionProvider>
        </body>
    </html>
  );
}
 
export default RootLayout;
