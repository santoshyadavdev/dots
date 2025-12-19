"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Plus } from "lucide-react"
import Image from "next/image"

interface ActivityCardProps {
  activity: {
    id: number
    name: string
    image: string
    kidFriendliness: number
    parentSanity: number
    tags: string[]
    description: string
  }
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-secondary text-secondary" : "fill-muted text-muted"}`} />
    ))
  }

  const renderParentRating = (rating: number) => {
    const emojis = ["😰", "😅", "😊", "😌", "🧘"]
    return (
      <span className="text-2xl" title={`Parent Sanity: ${rating}/5`}>
        {emojis[rating - 1]}
      </span>
    )
  }

  return (
    <Card className="overflow-hidden rounded-3xl border-border hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-muted">
        <Image src={activity.image || "/placeholder.svg"} alt={activity.name} fill className="object-cover" />
        <button className="absolute top-3 right-3 w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
          <Heart className="h-5 w-5 text-muted-foreground hover:text-destructive" />
        </button>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-xl text-balance">{activity.name}</CardTitle>
        <CardDescription className="text-pretty">{activity.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Ratings */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Kid-Friendliness</p>
            <div className="flex gap-0.5">{renderStars(activity.kidFriendliness)}</div>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-xs font-medium text-muted-foreground">Parent Sanity</p>
            <div className="flex justify-end">{renderParentRating(activity.parentSanity)}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {activity.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="rounded-full text-xs px-3 py-1 bg-accent text-accent-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Button className="w-full rounded-2xl" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Add to Itinerary
        </Button>
      </CardContent>
    </Card>
  )
}
