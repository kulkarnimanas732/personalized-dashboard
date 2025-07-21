'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     const res = await fetch('/api/auth/signup', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name, email, password }),
  //     })

  //     const data = await res.json()
  //     if (!res.ok) throw new Error(data.message)

  //     toast.success('Registration successful!')
  //     router.push('/auth/login')
  //   } catch (err: any) {
  //     toast.error(err.message || 'Something went wrong')
  //   } finally {
  //     setLoading(false)
  //   }
  // }
const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)
  try {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.message)

    toast.success('Registration successful!')
    router.push('/auth/login')
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message || 'Something went wrong')
    } else {
      toast.error('Something went wrong')
    }
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleRegister}
        className="bg-white/40 dark:bg-gray-800/50 backdrop-blur-md p-8 shadow-xl rounded-2xl border border-white/20 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Create Account 🚀
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg border dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
         <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
  Already have an account?{' '}
  <Link href="/auth/login" className="text-blue-500 font-medium underline">
    Login
  </Link>
</p>

<p className="mt-2 text-center text-sm">
  <Link href="/" className="text-gray-500 dark:text-gray-400 hover:underline">
    ← Back to Dashboard
  </Link>
</p>

       
      </form>
    </div>
  )
}

