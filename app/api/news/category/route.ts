import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') || 'general'
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=10&apiKey=${apiKey}`

  const response = await fetch(url)
  const data = await response.json()

  return NextResponse.json(data)
}
