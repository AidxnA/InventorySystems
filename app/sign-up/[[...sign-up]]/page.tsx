import { SignUp } from '@clerk/nextjs'
import { Truculenta } from 'next/font/google'

export default function Page() {
  return <div className = 'flex justify-center items-center min-h-screen'><SignUp/></div>
}