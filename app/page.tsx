import { LoginForm } from "@/components/auth/login-form"
import { OceanBackground } from "@/components/ui/ocean-background"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <OceanBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">EDNA Pipeline</h1>
            <p className="text-muted-foreground">Marine Biodiversity Research Platform</p>
            <p className="text-sm text-muted-foreground mt-1">Centre for Marine Living Resources and Ecology</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
