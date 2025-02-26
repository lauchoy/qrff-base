"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

function NavButton({ title, isMobileNav = false }: { title: string; isMobileNav?: boolean }) {
  useEffect(() => {
    // Effect for any future functionality
  }, [])

  const getHref = () => {
    if (title === "Volunteer") return "https://nvt1ahpwhbc.typeform.com/to/Tpe16VHj"
    if (title === "Partner") return "mailto:quickreactionfood@gmail.com"
    if (title === "Donate") return "https://www.pledge.to/quick-reaction-food-force"
    return '#'
  }

  return (
    <a 
      href={getHref()} 
      target={(title === "Volunteer" || title === "Donate") ? "_blank" : undefined}
      rel={(title === "Volunteer" || title === "Donate") ? "noopener noreferrer" : undefined}
    >
      <Button
        variant="ghost"
        className={`${
          isMobileNav 
            ? "text-white w-full justify-center text-3xl font-bold" 
            : "w-full md:w-auto justify-start md:justify-center hover:text-primary-light dark:hover:text-primary-dark"
        } relative group mobile-nav-button`}
        style={!isMobileNav ? {
          color: 'var(--header-text)',
          transition: 'color 0.5s ease'
        } : {}}
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

      // Get the element at the header position
      const headerHeight = 80; // Height of the header in pixels
      const elementBehindHeader = document.elementFromPoint(
        window.innerWidth / 2, // Center of the viewport horizontally
        headerHeight / 2 // Middle of the header
      );

      // Find the background element (could be the element itself or a parent)
      let backgroundElement = elementBehindHeader;
      let bgColor = 'rgba(0, 0, 0, 0)'; // Start with transparent
      
      // Traverse up the DOM tree until we find an element with a non-transparent background
      while (
        backgroundElement && 
        (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent' || !bgColor)
      ) {
        bgColor = window.getComputedStyle(backgroundElement).backgroundColor;
        if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent' || !bgColor) {
          backgroundElement = backgroundElement.parentElement;
        }
      }

      // If we couldn't find a background color, use a default
      if (!backgroundElement || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent' || !bgColor) {
        bgColor = '#ffffff'; // Default to white
      }

      // Set the header background color with some transparency
      // Parse the bgColor to add transparency if it's not already transparent
      if (bgColor.startsWith('rgb(') && !bgColor.startsWith('rgba(')) {
        // Convert rgb to rgba with 0.95 opacity
        const rgbValues = bgColor.match(/\d+/g);
        if (rgbValues && rgbValues.length >= 3) {
          bgColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.95)`;
        }
      }
      document.documentElement.style.setProperty('--header-bg', bgColor);
      
      // Determine if the background is dark or light
      const rgb = bgColor.match(/\d+/g);
      if (rgb && rgb.length >= 3) {
        const [r, g, b] = rgb.map(Number);
        // Calculate perceived brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // If brightness is less than 0.5, background is considered dark
        const textColor = brightness < 0.5 ? '#ffffff' : '#000000';
        document.documentElement.style.setProperty('--header-text', textColor);
      } else {
        // Default to black text if we can't determine the brightness
        document.documentElement.style.setProperty('--header-text', '#000000');
      }
    };

    // Initialize CSS variables on mount
    document.documentElement.style.setProperty('--header-bg', 'rgba(255, 255, 255, 0.95)');
    document.documentElement.style.setProperty('--header-text', '#000000');
    
    // We need to wait for the DOM to be fully loaded before we can use elementFromPoint
    if (typeof window !== 'undefined') {
      // Call handleScroll once on mount to set initial values based on current scroll position
      // Use a small timeout to ensure the DOM is ready
      setTimeout(handleScroll, 100);
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

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
                src="/qrff-logo-transparent.svg"
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
            className={`md:hidden p-4 mr-2 relative w-14 h-14 ${
              isMenuOpen ? "text-white" : "hover:text-primary-light dark:hover:text-primary-dark"
            }`}
            style={{ 
              zIndex: 50,
              color: isMenuOpen ? 'white' : 'var(--header-text)',
              transition: 'color 0.5s ease'
            }}
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
                <NavButton title="Volunteer" isMobileNav={true} />
                <NavButton title="Donate" isMobileNav={true} />
                <NavButton title="Partner" isMobileNav={true} />
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
