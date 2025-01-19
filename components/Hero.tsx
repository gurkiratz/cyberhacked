import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center x-4 text-center max-w-lg">
      <div className="space-y-6 max-w-3xl">
        {/* <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600"> */}
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-purple-500 to-yellow-200">
          CyberHacked
        </h1>
        <p className="text-xl md:text-2xl font-medium text-muted-foreground">
          Master Social Engineering Defense Through Real-World Simulations
        </p>
        {/* <div className="max-w-xl mx-auto">
          <p className="text-muted-foreground mb-8">
            Experience realistic social engineering scenarios in a safe
            environment. Learn to identify manipulation tactics, protect
            sensitive information, and strengthen your cybersecurity awareness.
          </p>
        </div> */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-500"
            asChild
          >
            <Link href="/register">Start training</Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/disclaimer">Learn More</Link>
          </Button>
        </div> */}
      </div>
    </div>
  )
}
