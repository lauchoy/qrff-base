"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import FundraiserPressRelease from "@/components/PressReleases/FundraiserPressRelease"
import { ScrollArea } from "@/components/ui/scroll-area"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import PreviewCard from "@/components/PreviewCard"

// Dynamically import footer component
const Footer = dynamic(() => import("@/components/ui/footer").then(mod => mod.Footer), {
  ssr: false
})

export default function MediaPressPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2EEEA] text-[#223438]">
      {/* Custom Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F2EEEA]/95 backdrop-blur-md border-b border-[#223438]/10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo container */}
            <Link href="/" className="h-20 flex items-center">
              <div className="relative h-full w-[120px] md:w-[140px]">
                <Image
                  src="/qrff-logo-transparent.svg"
                  alt="QRFF Logo"
                  fill
                  sizes="(max-width: 768px) 120px, 140px"
                  className="object-contain object-left"
                  priority
                />
              </div>
              <span className="text-[#223438] font-medium text-xl ml-2">Press Hub</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-4 -mr-4 relative w-14 h-14 ${
                isMenuOpen ? "text-white" : "text-[#223438] hover:text-[#223438]/70"
              }`}
              style={{ zIndex: 50 }}
            >
              {/* Hamburger icon */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
                isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
              }`}>
                <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                <div className="w-6 h-0.5 bg-current"></div>
              </div>
              
              {/* X icon */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
              }`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`fixed inset-0 bg-black text-white transition-transform duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col justify-center px-4 pt-20">
            <div className="space-y-12">
              <Link href="#" className="block text-3xl font-bold text-center">
                About
              </Link>
              <Link href="#" className="block text-3xl font-bold text-center">
                Media Kit
              </Link>
              <Link href="#" className="block text-3xl font-bold text-center">
                Contact
              </Link>
            </div>
          </div>
          <div className="px-4 py-8 space-y-4">
            <Link 
              href="https://instagram.com/quickreactionfood/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-lg hover:text-[#F8B345] transition-colors font-medium hover:opacity-70"
            >
              Instagram
            </Link>
            <div className="text-sm text-gray-400">
              © 2025 Quick Reaction Food Force
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-500 md:hidden ${
          isMenuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 30 }}
        onClick={() => setIsMenuOpen(false)}
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-[#F2EEEA] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-[#223438] mb-8 text-center md:text-left">Press Hub</h1>
            
            <p className="text-lg md:text-xl text-[#223438] max-w-3xl mb-12 text-center md:text-left mx-auto md:mx-0">
            Thank you for your interest in Quick Reaction Food Force. Below you&apos;ll find our media resources, including our latest press releases and presentation materials.
            </p>
            
            {/* Press Release Dialog */}
            <div className="mb-12">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full rounded-xl overflow-hidden bg-[#223438] text-[#F2EEEA] hover:bg-[#223438]/90 transition-colors">
                    <div className="aspect-[16/9] relative flex items-center justify-center p-8">
                      <span className="text-2xl md:text-3xl font-bold">QRFF Fundraiser Press Release</span>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] w-full md:max-w-[90vw] md:h-[95vh] h-[90vh] p-0">
                  <ScrollArea className="h-full">
                    <FundraiserPressRelease />
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Canva Presentation Thumbnail with Screenshot */}
            <Link href="https://www.canva.com/design/DAGeHUztQxQ/5RglgtWJ5LXefr-EWLSg5w/view#1" target="_blank" rel="noopener noreferrer">
              <PreviewCard 
                url="https://www.canva.com/design/DAGeHUztQxQ/5RglgtWJ5LXefr-EWLSg5w/view#1" 
                title="QRFF Presentation" 
              />
            </Link>
          </div>
        </section>
        
        {/* Contents Section - Temporarily Hidden */}
        {/* <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-[#223438] mb-12">Contents</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              Media Releases Card
              Company Info Card
              Leadership Card
              Photography Card
              Resources Card
            </div>
          </div>
        </section> */}
        
        {/* Contact Section */}
        <section className="bg-[#223438] py-16">
          <div className="container mx-auto px-4 text-center md:text-left">
            <h2 className="text-5xl font-bold mb-4 text-[#F2EEEA]">Have a question?</h2>
            <p className="text-xl mb-8 text-[#F2EEEA]">Let us help you with that.</p>
            
            <a 
              href="mailto:quickfoodforce@gmail.com" 
              className="inline-block bg-[#F8B345] text-[#223438] px-6 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Contact Team
            </a>
          </div>
        </section>
      </main>
      
      <Suspense fallback={
        <div className="w-full h-[200px] animate-pulse bg-primary-light/10 dark:bg-primary-dark/10" />
      }>
        <Footer />
      </Suspense>
    </div>
  )
}
