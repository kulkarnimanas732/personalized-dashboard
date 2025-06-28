// // 'use client'

// // import SettingsPanel from './components/SettingsPanel'

// // export default function Home() {
// //   return (
// //     <main className="p-4">
// //       <SettingsPanel />
// //     </main>
// //   )
// // }
// 'use client'

// import Dashboard from './Layout/Dashboard'
// // import SettingsPanel from './components/SettingsPanel'

// export default function HomePage() {
//   return (
//   <Dashboard children={undefined}>
//       {/* <SettingsPanel /> */}
//       {/* Other content will go here later */}
//     </Dashboard>
//   )
// }
// 'use client'

import Dashboard from './Layout/Dashboard'
// import SettingsPanel from './components/SettingsPanel'


export default function HomePage() {
  console.log('KEY:', process.env.NEXT_PUBLIC_NEWS_API_KEY)
  return (
    <Dashboard>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-600">Your personalized content will appear here.</p>
      </div>
    </Dashboard>
  )
}
