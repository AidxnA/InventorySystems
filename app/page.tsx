'use client'
import { UserButton } from "@clerk/nextjs";
import { SignIn } from "@clerk/react";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <section style={{ maxWidth: '640px', textAlign: 'center' }}>
        <h1>Inventory Dashboard</h1>
        <p>Welcome to your inventory system.</p>
      </section>
    </main>
  );
}
