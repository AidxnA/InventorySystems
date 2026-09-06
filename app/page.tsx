'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';

import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
   const handleSignIn = () => {router.push('/sign-in')}
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <section style={{ maxWidth: '640px', textAlign: 'center' }}>
        <h1>Inventory Dashboard</h1>
        <p>Welcome to your inventory system.</p>
         <Button onClick={handleSignIn}>Sign in</Button>
      </section>
    </main>
  );
}
