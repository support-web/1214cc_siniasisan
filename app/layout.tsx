import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'シニアのための資産運用診断',
  description: 'あなたに合った資産運用スタイルを簡単に診断できるサービスです。約1分で完了する5つの質問に答えて、最適な運用方針を見つけましょう。',
  keywords: ['資産運用', '診断', 'シニア', '投資', '老後資金', '退職金運用'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
