'use client'
import React 
from 'react'
import Logo from './Logo'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { navigationlink } from '@/Constants'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
    console.log(pathname)
  //const extractLastSegment = (path: string) => {
 //    return path.split()
 // }


  return (
    <div className="flex h-15 flex-row items-center justify-between bg-purple-200 p-4 shadow-2xl">
      <div><Logo /></div>
      <div className="flex flex-row space-x-4 font-mono justify-center items-center text-purple-950">
        {navigationlink.map((item, index) => {
          const isActive = pathname.startsWith(item.Link)
          return (
            <Link
              key={index}
              href={item.Link}
              className={`cursor-pointer ${isActive ? 'font-bold bg-violet-600 p-3 rounded-xl text-white' : ''}`}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
      <div><UserButton /></div>
    </div>
  )
}

export default Navbar
