import React from 'react'
import Greeting from '@/components/Greeting'
import { currentUser } from '@clerk/nextjs/server'
import { dashboardstatuscard } from '@/Constants'
import StatusCard from '@/components/ui/Dashboard/StatusCard'
type Props = {}

const page = async (props: Props) => {
   const  user = await currentUser()
   

  return (
    <div className="bg-gray-200 flex flex-col h-full max-w-5xl p-4 mx-auto">
      
      
      <Greeting username = {user?.firstName}/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {dashboardstatuscard.status.map((card) => (
          <StatusCard key={card.id} title={card.title} description={card.description} icon={card.icon}/>
        ))}
      </div>
    
    </div>
  )
}

export default page