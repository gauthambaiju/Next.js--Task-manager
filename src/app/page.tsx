'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main>
      <h1>Welcome to Task Manager</h1>
      <div className='container'>
        <button
          onClick={() => router.push('/login')}
        >
          Log In
        </button>
        <button
          onClick={() => router.push('/signup')}
        >
          Sign Up
        </button>
      </div>
    </main>
  )
}
