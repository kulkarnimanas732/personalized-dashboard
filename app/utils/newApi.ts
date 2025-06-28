// export const fetchNewsByCategory = async (category: string) => {
//   const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
//   const url = `https://newsapi.org/v2/top-headlines?country=us&categsory=business&apiKey=b9c27b306b854e25a6e3f1926e86fa87`

//   console.log('Fetching news from:', url)

//   const res = await fetch(url)

//   if (!res.ok) {
//     const err = await res.text()
//     console.error('News API error:', err)
//     throw new Error('Failed to fetch news')
//   }

//   const data = await res.json()
//   return data.articles
// }
export const fetchNewsByCategory = async (category: string) => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  console.log('Fetching news from:', url);

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.text();
    console.error('News API error:', err);
    throw new Error('Failed to fetch news');
  }

  const data = await res.json();
  return data.articles;
};
