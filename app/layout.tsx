
// This replaces _app.tsx in App Router
import './globals.css'

import Providers from './provider' // ✅ Import client wrapper

// import { store } from './store/index'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

