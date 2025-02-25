"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, Suspense, useRef } from "react"
import { ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Counter } from "@/components/ui/counter"

// Dynamically import footer component
const Footer = dynamic(() => import("@/components/ui/footer").then(mod => mod.Footer), {
  ssr: false
})
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/ui/header"

export default function Page() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const cards = [
    {
      title: "Rapid Response",
      description: "Mobilizing within hours to provide immediate food relief in crisis situations.",
      icon: <svg className="w-12 h-12 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    },
    {
      title: "Chef-Led Quality",
      description: "Professional chefs ensuring every meal is nutritious and delicious.",
      icon: <svg className="w-12 h-12 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
      </svg>
    },
    {
      title: "Community Impact",
      description: "Partnering with local organizations to maximize our reach and impact.",
      icon: <svg className="w-12 h-12 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    }
  ]

  useEffect(() => {
    if (!isAnimating) {
      const timer = setInterval(() => {
        setIsAnimating(true)
        setTimeout(() => {
          setActiveCard((prev) => (prev + 1) % cards.length)
          setIsAnimating(false)
        }, 500)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isAnimating, cards.length])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark relative">
      {/* Dotted Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center relative z-10">
        {/* Hero Section */}
        <section className="w-full h-screen relative">
          <div className="absolute inset-0">
            <Suspense fallback={
              <Skeleton className="w-full h-full bg-gray-900/50" />
            }>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ 
                  minHeight: '100vh',
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%'
                }}
                onError={(e) => {
                  const video = e.target as HTMLVideoElement;
                  video.style.display = 'none';
                }}
              >
                <source src="/qrff-desktop.webm" type="video/webm" />
              </video>
            </Suspense>
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
            <div className="w-full max-w-[800px] sm:max-w-[1000px] mx-auto mb-16 mt-32 sm:mb-12 sm:mt-4 animate-float-in px-6 sm:px-0">
              <Image
                src="/qrff-long-color-transparent.png"
                alt="QRFF Logo"
                width={1000}
                height={333}
                style={{ width: '100%', height: 'auto' }}
                priority
                className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)] scale-125 sm:scale-100"
              />
            </div>
            <div className="flex gap-4 sm:gap-12 justify-center mb-8 sm:mb-6 animate-float-in [animation-delay:200ms]">
              <Link href="https://form.typeform.com/to/OLhXswUF" target="_blank">
                <Button size="lg" className="bg-[#F8B345] hover:bg-[#F8B345] text-black px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl rounded-full font-geist uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Request
                </Button>
              </Link>
              <Link href="#" target="_blank">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 bg-transparent px-8 sm:px-12 py-6 sm:py-8 text-lg sm:text-xl rounded-full font-geist uppercase tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Donate
                </Button>
              </Link>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl text-white max-w-2xl mx-auto font-anton drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] animate-float-in [animation-delay:400ms] mt-8 sm:mt-0 px-4 sm:px-0">
              SUPPORTING LOS ANGELES WITH QUALITY MEALS FOR THOSE IN NEED
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section id="mission-section" className="w-full py-24 md:py-32 bg-primary-light/5 dark:bg-primary-dark/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton text-primary-light dark:text-primary-dark mb-12">
              A MISSION FOR RAPID DELICIOUS FOOD RELIEF TO THOSE WHO NEED IT
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 text-lg md:text-xl text-text-light dark:text-text-dark">
                <p>
                  We mobilize chefs and restaurants to provide immediate, hot, nutritious meals to those facing crisis. Our rapid response model ensures quality food reaches those who need it most, when they need it most.
                </p>
                <div className="flex justify-center mt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="mission-details" className="border-none">
                      <AccordionTrigger className="flex justify-center">
                        <span className="text-primary-light dark:text-primary-dark text-sm hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 px-3 py-2 rounded-md transition-colors">
                          Learn More
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pt-6 space-y-6">
                        <p className="text-lg md:text-xl text-text-light dark:text-text-dark">
                          Through strategic partnerships with local restaurants and food suppliers, we've built a network capable of responding to emergencies within hours. Our team of professional chefs ensures every meal meets the highest standards of quality and nutrition.
                        </p>
                        <p className="text-lg md:text-xl text-text-light dark:text-text-dark">
                          Whether it's a natural disaster, community crisis, or ongoing food insecurity, QRFF stands ready to deliver chef-prepared meals where they're needed most in Los Angeles.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="w-full py-16 md:py-32 bg-[#222216] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#F8B345]/10 to-transparent opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-anton text-white mb-16 text-center">
              OUR IMPACT IS IMMEDIATE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
              <Card className="bg-[#222216] backdrop-blur border-0 p-8 transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl hover:shadow-[#F8B345]/20">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-[#F8B345] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[72px] font-anton text-[#F8B345] mb-3 leading-none">
                  <Counter end={500} />
                </div>
                <h3 className="text-xl font-anton text-white mb-3">
                  Meals in 24 Hours
                </h3>
                <p className="text-white/90">
                  Immediate response capability during the Palisades and Eaton fires
                </p>
              </Card>
              <Card className="bg-[#222216] backdrop-blur border-0 p-8 transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl hover:shadow-[#F8B345]/20">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-[#F8B345] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2c-3.87 0-7 3.13-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[72px] font-anton text-[#F8B345] mb-3 leading-none">
                  <Counter end={1200} />
                </div>
                <h3 className="text-xl font-anton text-white mb-3">
                  Daily Meals
                </h3>
                <p className="text-white/90">
                  Scaled within one week of operations
                </p>
              </Card>
              <Card className="bg-[#222216] backdrop-blur border-0 p-8 transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl hover:shadow-[#F8B345]/20">
                <div className="mb-6">
                  <svg className="w-12 h-12 text-[#F8B345] mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[72px] font-anton text-[#F8B345] mb-3 leading-none">
                  <Counter end={16500} suffix="+"/>
                </div>
                <h3 className="text-xl font-anton text-white mb-3">
                  Total Meals
                </h3>
                <p className="text-white/90">
                  Served since January 8th
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="w-full h-screen bg-background-light dark:bg-background-dark">
          <Suspense fallback={
            <Skeleton className="w-full h-full bg-gray-900/50" />
          }>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              style={{ 
                minHeight: '100vh',
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
              onError={(e) => {
                const video = e.target as HTMLVideoElement;
                video.style.display = 'none';
              }}
            >
              <source src="/qrff-60fps-transparency.webm" type="video/webm" />
            </video>
          </Suspense>
        </section>

        {/* Partner Showcase */}
        <section className="w-full py-12 md:py-24 bg-primary-light/5 dark:bg-primary-dark/5">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton text-primary-light dark:text-primary-dark mb-12 text-center">
            OUR PARTNERS
          </h2>
          <div className="w-full mb-16 overflow-hidden">
            <div className="flex animate-scroll">
              <div className="relative aspect-[2/1] w-full shrink-0">
                <Image
                  src="/our-partners.png"
                  alt="Our Partners"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="relative aspect-[2/1] w-full shrink-0">
                <Image
                  src="/our-partners.png"
                  alt="Our Partners"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4">

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton text-primary-light dark:text-primary-dark mb-8 text-center">
              UPCOMING EVENTS
            </h2>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-background-light dark:bg-background-dark border-primary-light/20 dark:border-primary-dark/20 p-6">
                <Link href="https://www.exploretock.com/quick-reaction-food-force-los-angeles/event/535602/quick-reaction-food-force-fundraiser-in-dtla-meals-for-those-in-need-presented-by-tock" className="block hover:opacity-90 transition-opacity">
                  <h3 className="text-xl font-anton text-primary-light dark:text-primary-dark mb-4 line-clamp-1">
                    Quick Reaction Food Force Fundraiser: Meals for those in Need - by Tock
                  </h3>
                  <div className="space-y-2 text-text-light dark:text-text-dark mb-6">
                    <p>Wednesday, Feb 26, 2025</p>
                    <p>7:00 PM - 10:00 PM</p>
                    <p>Hope + Flower<br/>1201 S Hope St<br/>Los Angeles, CA 90015</p>
                  </div>
                  <Button className="w-full">
                    Register Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark px-4 py-16 md:py-24 w-full">
          <div className="container mx-auto text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl mb-12 font-anton">
              BE A PART OF THE FRONT LINES OF FOOD
            </h2>
            <Button
              size="lg"
              className="bg-[#F8B345] text-black hover:bg-[#F8B345]/90 text-2xl px-12 py-8 transform hover:scale-105 transition-all shadow-lg"
            >
              Donate Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <Suspense fallback={
          <div className="w-full h-[200px] animate-pulse bg-primary-light/10 dark:bg-primary-dark/10" />
        }>
          <Footer />
        </Suspense>

        {/* Down Arrow */}
        <button 
          onClick={() => document.getElementById('mission-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="fixed bottom-8 left-8 animate-bounce p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowRight className="w-12 h-12 transform rotate-90 text-white" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

interface KeyDataItemProps {
  icon: string
  text: string
}

function KeyDataItem({ icon, text }: KeyDataItemProps) {
  return (
    <Card className="flex items-center space-x-4 bg-background-light dark:bg-background-dark border-primary-light/20 dark:border-primary-dark/20">
      <CardContent className="flex items-center space-x-4 py-4">
        <span className="text-4xl">{icon}</span>
        <p className="text-lg text-text-light dark:text-text-dark">{text}</p>
      </CardContent>
    </Card>
  )
}

function VolunteerContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-anton text-primary-dark dark:text-primary">Join Our Volunteer Team</h3>
      <form className="space-y-4">
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Textarea placeholder="Why do you want to volunteer?" rows={3} />
        <Button type="submit" className="w-full bg-secondary text-primary-dark hover:bg-secondary/90">
          Sign Up
        </Button>
      </form>
      <div>
        <h4 className="font-anton text-primary-dark dark:text-primary">Upcoming Events</h4>
        {/* Add a calendar component here */}
      </div>
      <div>
        <h4 className="font-anton text-primary-dark dark:text-primary">Volunteer Impact</h4>
        <p className="text-primary-dark dark:text-primary">
          Our volunteers have helped serve over 16,500 meals to those in need!
        </p>
      </div>
    </div>
  )
}

function DonateContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-anton text-primary-dark dark:text-primary">Make a Difference Today</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
          $10
        </Button>
        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
          $25
        </Button>
        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
          $50
        </Button>
        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
          $100
        </Button>
      </div>
      <Input type="number" placeholder="Custom Amount" />
      <Button className="w-full bg-secondary text-primary-dark hover:bg-secondary/90">Donate Now</Button>
      <div>
        <h4 className="font-anton text-primary-dark dark:text-primary">Your Impact</h4>
        <p className="text-primary-dark dark:text-primary">
          Every $3.50 provides a fresh, quality meal to someone in need.
        </p>
      </div>
      <div>
        <h4 className="font-anton text-primary-dark dark:text-primary">Donor Love</h4>
        <p className="text-primary-dark dark:text-primary">
          &quot;Thank you for your generosity! Your support makes our work possible.&quot; - QRFF Team
        </p>
      </div>
    </div>
  )
}

function PartnerContent() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-anton text-primary-dark dark:text-primary">Partner with QRFF</h3>
      <div>
        <h4 className="font-anton text-primary-dark dark:text-primary">Sponsorship Levels</h4>
        <ul className="list-disc pl-5 text-primary-dark dark:text-primary">
          <li>Bronze: $1,000 - Logo on website</li>
          <li>Silver: $5,000 - Logo on website and event banners</li>
          <li>Gold: $10,000 - All Silver benefits + featured in newsletter</li>
          <li>Platinum: $25,000 - All Gold benefits + named sponsor for major event</li>
        </ul>
      </div>
      <div>
        <h4 className="font-anton text-primary-dark dark:text-primary">Current Partners</h4>
        <p className="text-primary-dark dark:text-primary">Tock, Hexclad, Goldhouse Ventures, Worldwide Produce</p>
      </div>
      <Button className="w-full bg-secondary text-primary-dark hover:bg-secondary/90">Contact Us to Partner</Button>
    </div>
  )
}
