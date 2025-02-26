"use client"

import { useEffect } from "react"
import Image from "next/image"

export default function QRPage() {
  
  useEffect(() => {
    // Redirect to the donation page after a short delay
    const redirectTimer = setTimeout(() => {
      window.location.href = "https://www.pledge.to/quick-reaction-food-force"
    }, 2000)
    
    return () => clearTimeout(redirectTimer)
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="text-center">
        <div className="w-[300px] h-[300px] relative mx-auto mb-8">
          <Image
            src="/placeholder.svg"
            alt="QR Code"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark mb-4">
          Redirecting to Donation Page...
        </h1>
        <p className="text-text-light/70 dark:text-text-dark/70">
          If you are not redirected automatically, <a href="https://www.pledge.to/quick-reaction-food-force" className="text-primary-light dark:text-primary-dark underline">click here</a>.
        </p>
      </div>
    </div>
  )
}
