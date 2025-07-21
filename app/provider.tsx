'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/index' // ✅ correct import

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}

