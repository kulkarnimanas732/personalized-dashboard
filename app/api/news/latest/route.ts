import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get('page') || '1'
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY

  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${apiKey}`)
  const data = await response.json()

  return NextResponse.json(data)
}
