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
    username? : string | undefined | null
}

const Greeting = ({username}: Props) => {
    const greetingMessage = () => {
        const currentHour = new Date().getHours()
        if (currentHour < 12) {
            return "Good Morning"
        } else if (currentHour < 18) {
            return "Good Afternoon"
        } else {
            return "Good Evening"
        }
    }
    return (
    <Card>
  <CardHeader>
    <CardTitle>{greetingMessage()}{', '}Welcome back,{username}!👋 
</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Everything you need to manage your inventory is right here. Check your stock, view your sales, manage products, and stay on top of your business.</p>
  </CardContent>
</Card>
  )
}

export default Greeting