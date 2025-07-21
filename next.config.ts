// // // import type { NextConfig } from 'next'

// // // const nextConfig: NextConfig = {
// // //   images: {
// // //     domains: [
// // //       'i.pravatar.cc', 
// // //       'image.tmdb.org',
// // //       // News API image domains
// // //       'image.cnbcfm.com',
// // //       'images.axios.com',
// // //       'a57.foxnews.com',
// // //       'nypost.com',
// // //       'static01.nyt.com',
// // //       'media.cnn.com',
// // //       'ichef.bbci.co.uk',
// // //       'www.reuters.com',
// // //       'assets.bwbx.io',
// // //       'www.washingtonpost.com',
// // //       'cdn.vox-cdn.com',
// // //       'techcrunch.com',
// // //       'www.theverge.com',
// // //       'www.axios.com',
// // //       'axios.com',
// // //       // Generic news domains that might appear
// // //       'images.unsplash.com',
// // //       'via.placeholder.com',
// // //     ], 
// // //   },
// // // }

// // // export default nextConfig

// // import type { NextConfig } from 'next'

// // const nextConfig: NextConfig = {
// //   images: {
// //     remotePatterns: [
// //       // Allow all HTTPS images - most flexible for news sources
// //       {
// //         protocol: 'https',
// //         hostname: '**',
// //       },
// //     ],
// //   },
// // }

// // export default nextConfig

// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [new URL('https://assets.example.com/account123/**')],
//     domains: [
//       'i.pravatar.cc',
//       'image.tmdb.org',
//       'image.cnbcfm.com',
//       'images.axios.com',
//       'a57.foxnews.com',
//       'nypost.com',
//       'static01.nyt.com',
//       'media.cnn.com',
//       'ichef.bbci.co.uk',
//       'www.reuters.com',
//       'assets.bwbx.io',
//       'www.washingtonpost.com',
//       'cdn.vox-cdn.com',
//       'techcrunch.com',
//       'www.theverge.com',
//       'www.axios.com',
//       'axios.com',
//       'images.unsplash.com',
//       'via.placeholder.com',
//       'shimajiro-mobiler.net',
//       'imageio.forbes.com', // 👈 newly added
//       'images.cointelegraph.com', // ✅ Added
//       's3.cointelegraph.com',     // ✅ Also required
//       'i.insider.com', // ✅ newly added
      
//     ],
//   },
// }

// export default nextConfig
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // wildcard: allow all HTTPS image domains
      },
    ],
  },
}

export default nextConfig
