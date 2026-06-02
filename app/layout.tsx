import type { Metadata } from "next"
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
  Prata,
} from "next/font/google"

import "./globals.css"

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
})

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: ["400"],
})

export const metadata: Metadata = {
  title: "Javier Viloria",
  description: "Editorial portfolio skeleton",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} ${prata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
