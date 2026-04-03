import type { Metadata } from "next";
import "./globals.css";
import StarField from "@/components/StarField";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Productivity Enhancement Community",
  description:
    "Track weekly champions, celebrate consistency, and stay motivated together.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StarField>{children}</StarField>
        <Footer />
      </body>
    </html>
  );
}
