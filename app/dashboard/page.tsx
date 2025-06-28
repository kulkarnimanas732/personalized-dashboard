'use client'

import Dashboard from  '../Layout/Dashboard'
import NewsFeed from '../components/NewFeed'

export default function DashboardPage() {
  return (
    <Dashboard>
      <div className="p-6">
        <NewsFeed category="business" />
        {/* You can duplicate to add more categories */}
        {/* <NewsFeed category="technology" /> */}
      </div>
    </Dashboard>
  )
}
