import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import "./globals.css";

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
            <ConditionalLayout>
              <div className="h-[calc(100vh-65px)] overflow-y-auto">
                {children}
              </div>
            </ConditionalLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
