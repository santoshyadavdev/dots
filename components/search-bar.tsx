"use client";

import { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  onSearch: (params: { destination: string; childrenAges: number[] }) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [destination, setDestination] = useState("");
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [ageInput, setAgeInput] = useState("");

  const addAge = () => {
    const age = Number.parseInt(ageInput);
    if (!isNaN(age) && age >= 0 && age <= 18) {
      setChildrenAges([...childrenAges, age]);
      setAgeInput("");
    }
  };

  const removeAge = (index: number) => {
    setChildrenAges(childrenAges.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    onSearch({ destination, childrenAges });
  };

  return (
    <div className="">
      {/* <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-12 h-14 text-lg rounded-2xl bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Ages of children</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter age"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAge()}
              className="h-12 rounded-2xl bg-background border-border"
              min="0"
              max="18"
            />
            <Button onClick={addAge} size="icon" className="h-12 w-12 rounded-full shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          {childrenAges.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {childrenAges.map((age, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-3 pr-1 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground"
                >
                  {age} {age === 1 ? "year" : "years"}
                  <button
                    onClick={() => removeAge(index)}
                    className="ml-2 hover:bg-secondary-foreground/10 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button onClick={handleSearch} className="w-full h-12 rounded-2xl text-lg font-medium">
          Find Activities
        </Button>
      </div> */}
    </div>
  );
}
