import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import * as fs from "fs";
import {generateTitulaire} from "@/lib/utils";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  fs.writeFileSync(process.cwd() + '/public/db.json', JSON.stringify(generateTitulaire(200)));
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
