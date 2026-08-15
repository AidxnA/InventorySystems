'use client'

import { SignIn } from '@clerk/react'
import { Truculenta } from 'next/font/google'

export default function Page() {
  return <div className = 'flex justify-center items-center min-h-screen'><SignIn/></div>
}