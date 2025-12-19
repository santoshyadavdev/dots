"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"

const itineraryItems = [
  { id: 1, time: "9:00 AM", name: "Sunshine Park", duration: "2h" },
  { id: 2, time: "11:30 AM", name: "Farm Animals", duration: "1.5h" },
  { id: 3, time: "1:30 PM", name: "Lunch Break", duration: "1h" },
  { id: 4, time: "3:00 PM", name: "Discovery Museum", duration: "2h" },
]

export function ConnectTheDotsMap() {
  return (
    <Card className="rounded-3xl border-border overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Connect the Dots
        </CardTitle>
        <p className="text-sm text-primary-foreground/90">Your daily itinerary</p>
      </CardHeader>

      <CardContent className="p-0">
        {/* Map Visual */}
        <div className="relative h-64 bg-muted p-6">
          <svg className="w-full h-full" viewBox="0 0 300 250">
            {/* Connecting lines */}
            <path
              d="M 50 40 Q 100 80, 150 70 T 250 120 T 150 180"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="text-primary opacity-50"
            />

            {/* Dots */}
            <g>
              {/* Dot 1 */}
              <circle cx="50" cy="40" r="20" className="fill-primary" />
              <text x="50" y="47" textAnchor="middle" className="fill-primary-foreground font-bold text-lg">
                1
              </text>

              {/* Dot 2 */}
              <circle cx="150" cy="70" r="20" className="fill-secondary" />
              <text x="150" y="77" textAnchor="middle" className="fill-secondary-foreground font-bold text-lg">
                2
              </text>

              {/* Dot 3 */}
              <circle cx="250" cy="120" r="20" className="fill-accent" />
              <text x="250" y="127" textAnchor="middle" className="fill-accent-foreground font-bold text-lg">
                3
              </text>

              {/* Dot 4 */}
              <circle cx="150" cy="180" r="20" className="fill-primary" />
              <text x="150" y="187" textAnchor="middle" className="fill-primary-foreground font-bold text-lg">
                4
              </text>
            </g>
          </svg>
        </div>

        {/* Itinerary List */}
        <div className="p-4 space-y-3">
          {itineraryItems.map((item, index) => (
            <div key={item.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-muted/50 transition-colors">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                ${
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : index === 1
                      ? "bg-secondary text-secondary-foreground"
                      : index === 2
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                }
              `}
              >
                {item.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{item.name}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                  <Badge variant="outline" className="rounded-full text-xs">
                    {item.duration}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
