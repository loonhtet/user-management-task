import localFont from "next/font/local";
import "./globals.css";

import { Noto_Serif_Oriya, Roboto } from "next/font/google";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import { ViewTransitions } from "next-view-transitions";

import ClientProvider from "./queryClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const roboto = Roboto({
  weight: "400", // Specify the font weight you want
  subsets: ["latin"], // Specify subsets you want to include
  variable: "--font-roboto",
});

const noto = Noto_Serif_Oriya({
  weight: ["400", "600"],
  subsets: ["oriya"],
  variable: "--font-noto",
});

export const metadata = {
  title: "User Management",
  description: "User Mangement Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${noto.variable} antialiased`}
      >
        <ViewTransitions>
          <ClientProvider>
            <AntdRegistry>{children}</AntdRegistry>
          </ClientProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
