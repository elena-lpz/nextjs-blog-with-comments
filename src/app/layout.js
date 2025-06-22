import { Work_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const workSans = Work_Sans({
  weight: "variable",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: "variable",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Female Gaze",
  description: "A blog about female photographers.",
  type: "website",
  url: "https://thefemalegaze.vercel.app/",
  icons: {
    icon: "/logos/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${workSans.className} ${fraunces.variable} flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
