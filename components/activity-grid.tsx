"use client";

import { ActivityCard } from "@/components/activity-card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface ActivityGridProps {
  filters: any;
  searchParams: any;
  aiRecommendations?: any;
}

// Sample activity data
const activities = [];

export function ActivityGrid({
  filters,
  searchParams,
  aiRecommendations,
}: ActivityGridProps) {
  // Filter activities based on filters
  const filteredActivities = activities.filter((activity) => {
    if (filters.napTimeFriendly && !activity.napTimeFriendly) return false;
    if (filters.budget !== "all" && activity.budget !== filters.budget)
      return false;
    if (
      filters.environment !== "all" &&
      activity.environment !== filters.environment
    )
      return false;
    if (
      filters.educationalLevel !== "all" &&
      activity.educationalLevel !== filters.educationalLevel
    )
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">
          Recommended Activities
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredActivities.length}{" "}
          {filteredActivities.length === 1 ? "result" : "results"}
        </p>
      </div>

      {/* Show AI Recommendations First */}
      {aiRecommendations?.activities &&
        aiRecommendations.activities.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                AI-Powered Suggestions
              </h3>
              <Badge variant="secondary" className="ml-auto">
                Personalized
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {aiRecommendations.activities.map(
                (activity: any, index: number) => (
                  <ActivityCard key={`ai-${index}`} activity={activity} />
                )
              )}
            </div>
          </div>
        )}

      {/* Show Static Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredActivities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>

      {/* {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No activities match your filters. Try adjusting your criteria!
          </p>
        </div>
      )} */}
    </div>
  );
}
