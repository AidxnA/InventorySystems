import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const StatusCard = (props: Props) => {
  return (
<Card>
  <CardHeader>
    <CardTitle className= 'text-purple-600'>{props.icon}</CardTitle>
    <CardDescription className= 'text-sm font-bold text-gray-900'>{props.title}</CardDescription>
  
  </CardHeader>
  <CardContent className="flex flex-row gap-x-3">
    <p>C</p>
    <p>1900</p>
  </CardContent>
  <CardFooter>
    <p>{props.description}</p>
  </CardFooter>
</Card>
  )
}

export default StatusCard