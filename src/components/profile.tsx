'use client'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const session = useSession()
  if (session.data?.user) {
    return (
      <div>
        <h1>Profile from a client component</h1>
        <p>{session.data.user.email}</p>
      </div>
    )
  }

  return (
    <div>
      <h1>User NOT signed</h1>
    </div>
  )
}