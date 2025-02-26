import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#222216] text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
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
          <div className="flex flex-col md:flex-row items-center gap-6 md:mr-auto md:ml-12">
            <div className="flex items-center gap-6">
              <a 
                href="https://www.instagram.com/quickreactionfood/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F8B345] transition-colors"
              >
                <Instagram size={24} />
              </a>
              <Link 
                href="/media-press"
                className="font-medium relative group px-4 py-2 rounded-md border border-white/20 hover:border-white/40 transition-all"
              >
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#FF1F1F] via-[#FF7F00] via-[#FFFF00] via-[#00FF00] via-[#0000FF] to-[#9F00FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  MEDIA/PRESS
                </span>
                <span className="absolute inset-0 flex items-center justify-center text-white group-hover:opacity-0 transition-opacity">
                  MEDIA/PRESS
                </span>
              </Link>
            </div>
            <div className="text-sm text-white/60 text-center md:text-left md:ml-6">
              © {new Date().getFullYear()} Quick Reaction Food Force LLC. Pending 501(c)(3). All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
