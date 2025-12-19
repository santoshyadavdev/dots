"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { ActivityGrid } from "@/components/activity-grid"
import { ConnectTheDotsMap } from "@/components/connect-the-dots-map"
import { VoicePlanner } from "@/components/voice-planner"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [filters, setFilters] = useState({
    napTimeFriendly: false,
    budget: "all",
    environment: "all",
    educationalLevel: "all",
  })

  const [searchParams, setSearchParams] = useState({
    destination: "",
    childrenAges: [] as number[],
  })

  const handleVoiceItinerary = (data: { destination: string; travelers: number; interests: string }) => {
    console.log("[v0] Voice itinerary captured:", data)
    setSearchParams({
      destination: data.destination,
      childrenAges: [], // Could be parsed from travelers info
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    <div className="w-2 h-2 rounded-full bg-primary-foreground"></div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-foreground">Dots</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                My Trips
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Saved
              </a>
              <Button size="sm" className="rounded-full">
                Sign In
              </Button>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">
              Plan Your Perfect Family Adventure
            </h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Discover kid-friendly activities and connect the dots for unforgettable memories
            </p>
          </div>

          <div className="mb-6 max-w-md mx-auto">
            <VoicePlanner onItineraryCapture={handleVoiceItinerary} />
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">or search manually</p>
          </div>

          <SearchBar onSearch={setSearchParams} />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
          {/* Filter Sidebar */}
          <aside
            className={`
            ${sidebarOpen ? "block" : "hidden"} lg:block
            fixed lg:sticky top-20 left-0 right-0 lg:top-24 
            bg-background lg:bg-transparent z-30 p-4 lg:p-0
            max-h-[calc(100vh-5rem)] overflow-y-auto
          `}
          >
            <FilterSidebar filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Activity Grid */}
          <div className="lg:col-span-1">
            <ActivityGrid filters={filters} searchParams={searchParams} />
          </div>

          {/* Connect the Dots Map */}
          <aside className="hidden xl:block sticky top-24 self-start">
            <ConnectTheDotsMap />
          </aside>
        </div>
      </main>
    </div>
  )
}
