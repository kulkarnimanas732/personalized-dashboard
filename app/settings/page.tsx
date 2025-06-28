'use client'

import SettingsPanel from '../components/SettingsPanel'

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Preferences</h1>
      <SettingsPanel />
    </div>
  )
}
