import type { Metadata } from "next";
// THIS IS THE LINE THAT TURNS ON TAILWIND CSS 👇
import "./globals.css"; 

export const metadata: Metadata = {
  title: "EcoTrack AI | Actionable Climate Coaching",
  description: "Track your carbon footprint and turn saving the planet into a game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-50">
        {children}
      </body>
    </html>
  );
}
