'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.error) {
      toast.error('Invalid email or password')
    } else {
      toast.success('Login successful')
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleLogin}
        className="bg-white/40 dark:bg-gray-800/50 backdrop-blur-md p-8 shadow-xl rounded-2xl border border-white/20 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Welcome Back 👋
        </h2>

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
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
  Don’t have an account?{' '}
  <Link href="/auth/register" className="text-blue-500 font-medium underline">
    Register
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
