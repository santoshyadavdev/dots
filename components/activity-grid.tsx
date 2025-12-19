"use client"

import { ActivityCard } from "@/components/activity-card"

interface ActivityGridProps {
  filters: any
  searchParams: any
}

// Sample activity data
const activities = [
  {
    id: 1,
    name: "Children's Discovery Museum",
    image: "/colorful-children-s-museum-with-interactive-exhibi.jpg",
    kidFriendliness: 5,
    parentSanity: 4,
    tags: ["Indoor", "Interactive", "Educational", "Has Changing Tables"],
    description: "Interactive exhibits for curious minds. Perfect for rainy days!",
    budget: "medium",
    environment: "indoor",
    educationalLevel: "educational",
    napTimeFriendly: false,
  },
  {
    id: 2,
    name: "Sunshine Park & Playground",
    image: "/bright-sunny-playground-with-kids-playing.jpg",
    kidFriendliness: 5,
    parentSanity: 5,
    tags: ["Outdoor", "Stroller Accessible", "Free Entry", "Shaded Areas"],
    description: "Wide open spaces for running, climbing, and exploring nature.",
    budget: "free",
    environment: "outdoor",
    educationalLevel: "play",
    napTimeFriendly: true,
  },
  {
    id: 3,
    name: "Aquarium Adventure",
    image: "/beautiful-aquarium-with-colorful-fish-and-children.jpg",
    kidFriendliness: 5,
    parentSanity: 3,
    tags: ["Indoor", "Interactive", "Educational", "Stroller Accessible"],
    description: "Dive into an underwater world with thousands of marine animals.",
    budget: "high",
    environment: "indoor",
    educationalLevel: "educational",
    napTimeFriendly: false,
  },
  {
    id: 4,
    name: "Storybook Library Hour",
    image: "/cozy-library-with-children-sitting-for-story-time.jpg",
    kidFriendliness: 4,
    parentSanity: 5,
    tags: ["Indoor", "Quiet Option", "Free Entry", "Educational"],
    description: "Weekly storytime with songs, crafts, and new friends.",
    budget: "free",
    environment: "indoor",
    educationalLevel: "educational",
    napTimeFriendly: true,
  },
  {
    id: 5,
    name: "Farm Animal Experience",
    image: "/friendly-farm-with-children-petting-animals.jpg",
    kidFriendliness: 5,
    parentSanity: 4,
    tags: ["Outdoor", "Interactive", "Has Changing Tables", "Snack Bar"],
    description: "Pet and feed friendly farm animals in a safe environment.",
    budget: "low",
    environment: "outdoor",
    educationalLevel: "mixed",
    napTimeFriendly: false,
  },
  {
    id: 6,
    name: "Mini Golf Paradise",
    image: "/colorful-mini-golf-course-with-fun-obstacles.jpg",
    kidFriendliness: 4,
    parentSanity: 4,
    tags: ["Outdoor", "Interactive", "Snack Bar", "Group Friendly"],
    description: "18 holes of family fun with whimsical themes and obstacles.",
    budget: "low",
    environment: "outdoor",
    educationalLevel: "play",
    napTimeFriendly: false,
  },
]

export function ActivityGrid({ filters, searchParams }: ActivityGridProps) {
  // Filter activities based on filters
  const filteredActivities = activities.filter((activity) => {
    if (filters.napTimeFriendly && !activity.napTimeFriendly) return false
    if (filters.budget !== "all" && activity.budget !== filters.budget) return false
    if (filters.environment !== "all" && activity.environment !== filters.environment) return false
    if (filters.educationalLevel !== "all" && activity.educationalLevel !== filters.educationalLevel) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Recommended Activities</h2>
        <p className="text-sm text-muted-foreground">
          {filteredActivities.length} {filteredActivities.length === 1 ? "result" : "results"}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No activities match your filters. Try adjusting your criteria!
          </p>
        </div>
      )}
    </div>
  )
}
