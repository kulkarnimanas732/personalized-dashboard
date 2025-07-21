import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import ReduxProvider from '@/components/ReduxProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
