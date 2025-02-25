import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-primary-light/20 dark:border-primary-dark/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="w-[100px] h-[100px] relative hover:opacity-80 transition-opacity">
            <Image
              src="/qrff-logo-color-transparent.png"
              alt="QRFF Logo"
              fill
              sizes="100px"
              className="object-contain"
              priority
            />
          </Link>
          <a 
            href="https://www.canva.com/design/DAGeHUztQxQ/5RglgtWJ5LXefr-EWLSg5w/view#6"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium relative group"
          >
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] via-[#00ff00] to-[#0000ff] opacity-0 group-hover:opacity-100 transition-opacity">
              MEDIA KIT
            </span>
            <span className="absolute inset-0 text-text-light dark:text-text-dark group-hover:opacity-0 transition-opacity">
              MEDIA KIT
            </span>
          </a>
        </div>
        <div className="text-center text-sm text-text-light/60 dark:text-text-dark/60">
          © {new Date().getFullYear()} Quick Reaction Food Force. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
