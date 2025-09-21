import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { PublicNavbar } from "@/features/navbar/components/public-navbar";
import "./globals.css";
import { Footer } from '@/features/home/components/footer';

export const metadata: Metadata = {
  title: "Juanwork",
  description: "Connect with top freelancers and clients worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <PublicNavbar />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
