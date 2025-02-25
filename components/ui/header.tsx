"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

function NavButton({ title }: { title: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setIsDesktop(window.innerWidth >= 768)

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getHref = () => {
    if (title === "Volunteer") return "https://form.typeform.com/to/IhkZirpN"
    if (title === "Partner") return "mailto:quickreactionfood@gmail.com"
    if (title === "Donate") return isMounted ? (isDesktop ? '/qr' : '/404') : '#'
    return '#'
  }

  return (
    <a 
      href={getHref()} 
      target={title === "Volunteer" ? "_blank" : undefined}
      rel={title === "Volunteer" ? "noopener noreferrer" : undefined}
    >
      <Button
        variant="ghost"
        className="text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark w-full md:w-auto justify-start md:justify-center relative group mobile-nav-button"
      >
        <span className="relative">
          <span className="absolute -inset-1 rounded-lg bg-primary-light/20 dark:bg-primary-dark/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          <span className="absolute -inset-1 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left delay-75"></span>
          {title}
        </span>
      </Button>
    </a>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const show = scrollY > windowHeight * 0.8
      setIsScrolled(show)

      // Find the current section based on scroll position
      const sections = document.querySelectorAll('section')
      let currentSection = null
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentSection = section
        }
      })

      if (currentSection) {
        // Get the computed background color of the current section
        const bgColor = window.getComputedStyle(currentSection).backgroundColor
        document.documentElement.style.setProperty('--header-bg', bgColor)
      } else {
        document.documentElement.style.setProperty('--header-bg', '#ffffff')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? "translate-y-0 bg-opacity-95" 
          : "-translate-y-full bg-opacity-0"
      }`}
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--text-light)',
        backdropFilter: isScrolled ? 'blur(8px)' : 'none'
      }}
    >
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo container */}
          <Link href="/" className="h-20 flex items-center -ml-4 md:ml-0">
            <div className="relative h-full w-[120px] md:w-[140px]">
              <Image
                src="/qrff-logo-color-transparent.png"
                alt="QRFF Logo"
                fill
                sizes="(max-width: 768px) 120px, 140px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-4 -mr-2 relative w-14 h-14 ${
              isMenuOpen ? "text-white" : "text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark"
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
              <X size={24} />
            </div>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavButton title="Volunteer" />
            <NavButton title="Donate" />
            <NavButton title="Partner" />
          </div>
        </div>

      </div>
      </header>

      {/* Mobile Navigation Dropdown */}
    <div 
      className={`NavigationMobileDropdown fixed inset-0 bg-black text-white transition-transform duration-500 ease-in-out md:hidden [&_.mobile-nav-button]:!text-white [&_.mobile-nav-button]:!justify-center [&_.mobile-nav-button]:!text-3xl [&_.mobile-nav-button]:!font-bold [&_button]:!bg-transparent ${
        isMenuOpen ? "navIsOpen translate-y-0" : "-translate-y-full"
      }`}
      style={{ zIndex: 40 }}
      data-theme="black"
    >
      <div className="NavigationMobileDropdown_inner h-full flex flex-col">
        <div className="NavigationMobileDropdown_linksAndButtons flex-1 flex flex-col justify-center px-4 pt-20">
              <div className="space-y-12">
                <NavButton title="Volunteer" />
                <NavButton title="Donate" />
                <NavButton title="Partner" />
              </div>
            </div>
            <div className="NavigationMobileDropdown_socialMediaAndLegal px-4 py-8 space-y-4">
              <a 
                href="https://instagram.com/quickreactionfood/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-lg hover:text-primary-light transition-colors font-medium hover:opacity-70"
              >
                Instagram
              </a>
              <div className="text-sm text-gray-400">
                © 2025 Quick Reaction Food Force
              </div>
        </div>
      </div>
    </div>

    {/* Navigation Background Overlay */}
    <div 
      className={`headerBg fixed inset-0 bg-black transition-opacity duration-500 md:hidden ${
        isMenuOpen ? "navIsOpen opacity-50" : "opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 30 }}
      onClick={() => setIsMenuOpen(false)}
      data-theme="black"
      />
    </>
  )
}
