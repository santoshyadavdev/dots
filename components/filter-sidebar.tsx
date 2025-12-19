"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Baby, DollarSign, Cloud, GraduationCap } from "lucide-react"

interface FilterSidebarProps {
  filters: {
    napTimeFriendly: boolean
    budget: string
    environment: string
    educationalLevel: string
  }
  onFilterChange: (filters: any) => void
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  return (
    <Card className="p-6 rounded-3xl border-border">
      <h3 className="text-lg font-bold text-foreground mb-6">Filters</h3>

      <div className="space-y-6">
        {/* Nap-time Friendly */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Baby className="h-4 w-4 text-primary" />
              <Label htmlFor="nap-time" className="text-sm font-medium text-foreground">
                Nap-time Friendly
              </Label>
            </div>
            <Switch
              id="nap-time"
              checked={filters.napTimeFriendly}
              onCheckedChange={(checked) => onFilterChange({ ...filters, napTimeFriendly: checked })}
            />
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-secondary" />
            <Label className="text-sm font-medium text-foreground">Budget</Label>
          </div>
          <RadioGroup value={filters.budget} onValueChange={(value) => onFilterChange({ ...filters, budget: value })}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="budget-all" />
              <Label htmlFor="budget-all" className="text-sm text-foreground cursor-pointer">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="budget-free" />
              <Label htmlFor="budget-free" className="text-sm text-foreground cursor-pointer">
                Free
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="budget-low" />
              <Label htmlFor="budget-low" className="text-sm text-foreground cursor-pointer">
                $ Low
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="budget-medium" />
              <Label htmlFor="budget-medium" className="text-sm text-foreground cursor-pointer">
                $$ Medium
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="budget-high" />
              <Label htmlFor="budget-high" className="text-sm text-foreground cursor-pointer">
                $$$ High
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Indoor/Outdoor */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="h-4 w-4 text-accent" />
            <Label className="text-sm font-medium text-foreground">Environment</Label>
          </div>
          <RadioGroup
            value={filters.environment}
            onValueChange={(value) => onFilterChange({ ...filters, environment: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="env-all" />
              <Label htmlFor="env-all" className="text-sm text-foreground cursor-pointer">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="indoor" id="env-indoor" />
              <Label htmlFor="env-indoor" className="text-sm text-foreground cursor-pointer">
                Indoor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="outdoor" id="env-outdoor" />
              <Label htmlFor="env-outdoor" className="text-sm text-foreground cursor-pointer">
                Outdoor
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="env-both" />
              <Label htmlFor="env-both" className="text-sm text-foreground cursor-pointer">
                Indoor & Outdoor
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Educational Level */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <Label className="text-sm font-medium text-foreground">Educational Level</Label>
          </div>
          <RadioGroup
            value={filters.educationalLevel}
            onValueChange={(value) => onFilterChange({ ...filters, educationalLevel: value })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="edu-all" />
              <Label htmlFor="edu-all" className="text-sm text-foreground cursor-pointer">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="play" id="edu-play" />
              <Label htmlFor="edu-play" className="text-sm text-foreground cursor-pointer">
                Play-focused
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mixed" id="edu-mixed" />
              <Label htmlFor="edu-mixed" className="text-sm text-foreground cursor-pointer">
                Mixed
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="educational" id="edu-educational" />
              <Label htmlFor="edu-educational" className="text-sm text-foreground cursor-pointer">
                Educational
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  )
}
