import React from 'react'
import Greeting from '@/components/Greeting'
import { currentUser } from '@clerk/nextjs/server'

type Props = {}

const page = async (props: Props) => {
   const  user = await currentUser()

  return (
    <div className="bg-gray-200 flex flex-col h-full max-w-5xl p-4 mx-auto">
      
      
      <Greeting username = {user?.firstName}/>
    
    </div>
  )
}

export default page