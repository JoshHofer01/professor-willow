import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import PageFooter from "@/components/PageFooter";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport, Metadata } from "next";
 
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
 
export const metadata: Metadata = {
  metadataBase: new URL("https://professorwillow.me"),
  openGraph: {
    siteName: "ProfessorWillow",
    type: "website",
    locale: "en_US"
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  applicationName: "ProfessorWillow",
  appleWebApp: {
    title: "ProfessorWillow",
    statusBarStyle: "default",
    capable: true
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      },
      /* {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      } */
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon"
      }
    ],
    /* apple: [
      {
        url: "/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png"
      },
      {
        url: "/apple-icon-60x60.png",
        sizes: "60x60",
        type: "image/png"
      }
    ] */
  }
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      {process.env.NODE_ENV === "production" && (
        <>
          <GoogleAnalytics gaId="G-9FZ3MR1FFD" />
        </>
      )}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopNav />
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-x-hidden">
            <main>
              {children}
              <PageFooter />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
