import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()
    const existingUser = await db.collection('users').findOne({ email })

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.collection('users').insertOne({ name, email, password: hashedPassword })

    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 })
  }
}
