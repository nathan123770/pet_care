import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "毛茸日记宠物洗护店",
  description: "宠物洗护、SPA、造型修剪预约单页",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
