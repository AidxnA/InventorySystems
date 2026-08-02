'use client'

import { useUser } from '@clerk/nextjs'

export default function Page() {
  const { isSignedIn, isLoaded } = useUser()

  // Handle loading state
  if (!isLoaded) return <h1>Loading...</h1>

  if (!isSignedIn) {
    // Add logic to handle the unauthenticated user
    // This example renders a UI but you could also redirect to the sign-in page instead
    return <h1>You must be signed in to view this page</h1>
  }

  return <h1>Hello world</h1>
}