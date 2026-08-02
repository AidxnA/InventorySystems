import { SignIn } from '@clerk/nextjs'
import { Truculenta } from 'next/font/google'

export default function Page() {
  return <div className = 'flex justify-center items-center min-h-screen'><SignIn withSignUp = {true}/></div>
}