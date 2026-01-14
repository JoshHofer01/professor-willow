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
    title: 'ProfessorWillow | Pokemon GO Companion',
    siteName: 'ProfessorWillow',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  applicationName: "ProfessorWillow",
  appleWebApp: {
    title: "ProfessorWillow",
    statusBarStyle: "default",
    capable: true,
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/branding/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        url: "/branding/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      }
    ],
    shortcut: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
    apple: [
      {
        url: "/branding/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/branding/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/branding/android-chrome-512x512.png',
      }
    ]
  },
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics gaId="G-9FZ3MR1FFD" />
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
