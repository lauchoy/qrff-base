"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface TimelinePoint {
  id: string
  title: string
  content: string
  metric?: number
}

const timelineData: TimelinePoint[] = [
  {
    id: "24h",
    title: "WITHIN 24 HOURS OF THE FIRES",
    content: "We converted the entire Rosalynn space into a Meal Prep facility, suspended all services to support the effort and churned out 500 meals on day one with just our team.",
    metric: 500
  },
  {
    id: "72h",
    title: "WITHIN 72 HOURS",
    content: "We secured major brand partners, such as Hexclad, Breville, Re-up Supplies, Meat Distro, Worldwide Produce, High Society Meats, THOR Kitchen and many more to get our operations scaled.",
    metric: 0,
  },
  {
    id: "5d",
    title: "WITHIN 5 DAYS",
    content: "We scaled to increase capacity to 800 meals by increasing to 20 volunteers daily on average, and secured direct relationships with LA DREAM, LAFD, Humane Society, LA Sheriff, and many more orgs.",
    metric: 800
  },
  {
    id: "1w",
    title: "WITHIN ONE WEEK",
    content: "We increased capacity to a record 1200 meals daily and established a Non-Profit fundraiser with Philanthropy Worldwide (501c3) and established the QRFF to focus on establishing streamlined operations.",
    metric: 1200
  }
]

const CountUp = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / (duration * 1000)

      if (progress < 1) {
        setCount(Math.floor(end * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, inView])

  return <span ref={ref}>{count}</span>
}

const TimelineCard = ({ point, index }: { point: TimelinePoint; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={point.id} className="border-none">
          <Card className="bg-background-light dark:bg-background-dark border-primary-light/20 dark:border-primary-dark/20 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <AccordionTrigger className="p-6 w-full [&[data-state=open]>svg]:rotate-180">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-primary-light dark:text-primary-dark leading-tight text-left">
                  {point.title}
                </h3>
                <div className="mt-4">
                  {point.id === "72h" ? (
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 font-sans tracking-tight whitespace-nowrap">
                      Partners on Board
                    </div>
                  ) : point.metric ? (
                    <div className="text-3xl sm:text-4xl font-bold text-green-600 font-sans tracking-tight">
                      <CountUp end={point.metric} /> meals
                    </div>
                  ) : null}
                </div>
              </div>
              <ChevronDown className="h-6 w-6 shrink-0 text-primary-light dark:text-primary-dark transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 pb-6">
                <p className="text-text-light dark:text-text-dark leading-relaxed text-base">
                  {point.content}
                </p>
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </motion.div>
  )
}

export function Timeline() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {timelineData.map((point, index) => (
          <TimelineCard key={point.id} point={point} index={index} />
        ))}
      </div>
    </div>
  )
}
