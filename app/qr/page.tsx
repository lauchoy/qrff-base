import Image from "next/image"

export default function QRPage() {
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
        <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
          Scan to Donate
        </h1>
      </div>
    </div>
  )
}
