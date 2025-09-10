"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Download, CheckCircle, Waves } from "lucide-react"

export default function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setIsInstallable(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Waves className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Install EDNA Pipeline</CardTitle>
          <CardDescription>Get the full app experience on your Android device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Works offline</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Native app experience</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Push notifications</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Fast loading</span>
            </div>
          </div>

          {isInstallable ? (
            <Button onClick={handleInstall} className="w-full" size="lg">
              <Smartphone className="w-4 h-4 mr-2" />
              Install App
            </Button>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">To install on Android:</p>
              <ol className="text-sm text-left space-y-1">
                <li>1. Open Chrome browser</li>
                <li>2. Visit the EDNA Pipeline website</li>
                <li>3. Tap "Add to Home Screen"</li>
                <li>4. Tap "Install"</li>
              </ol>
            </div>
          )}

          <Button variant="outline" className="w-full bg-transparent" asChild>
            <a href="/">
              <Download className="w-4 h-4 mr-2" />
              Back to Dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
