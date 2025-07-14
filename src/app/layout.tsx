import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "./reduxProviders";
import Popup from "@/components/popup";
import DialogBox from "@/components/DialogBox";
import { DialogBoxProvider } from "@/Contexts/DialogBoxContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking Application",
  description: "Booking Application For All Needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="">
        <Providers>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <div className="flex basis-full h-screen flex-col">
            <div className="flex-1 basis-1/12 sticky" style={{ flexBasis: 'auto' }}>
              <Header />
            </div>
            <div>
              <Popup />
            </div>
            <div className="flex basis-11/12">
              <DialogBoxProvider>
                <DialogBox />
                {children}
              </DialogBoxProvider>
            </div>
          </div>
        </Providers>
      </body>

    </html>
  );
}
