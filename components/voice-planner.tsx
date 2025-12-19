"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, MicOff, Loader2 } from "lucide-react"
import Vapi from "@vapi-ai/web"
import { getVapiConfig } from "@/app/actions/vapi"

interface VoicePlannerProps {
  onItineraryCapture?: (data: { destination: string; travelers: number; interests: string }) => void
}

export function VoicePlanner({ onItineraryCapture }: VoicePlannerProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [status, setStatus] = useState<string>("Loading voice assistant...")
  const [configError, setConfigError] = useState<string>("")
  const vapiRef = useRef<any>(null)
  const configRef = useRef<{ publicKey: string; assistantId: string | null } | null>(null)

  useEffect(() => {
    // Fetch Vapi configuration from server
    const initializeVapi = async () => {
      try {
        const config = await getVapiConfig()

        if ("error" in config) {
          setConfigError(config.error)
          setStatus("Voice assistant not configured")
          return
        }

        // Store config for later use
        configRef.current = config

        // Initialize Vapi instance with the key from server
        vapiRef.current = new Vapi(config.publicKey)

        // Set up event listeners
        vapiRef.current.on("call-start", () => {
          console.log("[v0] Call started")
          setIsConnected(true)
          setIsLoading(false)
          setStatus("Listening... Tell me about your travel plans")
        })

        vapiRef.current.on("call-end", () => {
          console.log("[v0] Call ended")
          setIsConnected(false)
          setStatus("Ready to plan your trip")
        })

        vapiRef.current.on("speech-start", () => {
          console.log("[v0] User started speaking")
          setStatus("Listening to your plans...")
        })

        vapiRef.current.on("speech-end", () => {
          console.log("[v0] User stopped speaking")
          setStatus("Processing...")
        })

        vapiRef.current.on("message", (message: any) => {
          console.log("[v0] Message received:", message)

          if (message.type === "transcript" && message.role === "user") {
            setTranscript((prev) => prev + " " + message.transcript)
          }

          if (message.type === "function-call") {
            // Handle extracted travel information
            const params = message.functionCall?.parameters
            if (params && onItineraryCapture) {
              onItineraryCapture({
                destination: params.destination || "",
                travelers: params.travelers || 1,
                interests: params.interests || "",
              })
            }
          }
        })

        vapiRef.current.on("error", (error: any) => {
          console.error("[v0] Vapi error:", error)
          setStatus("Error occurred. Please try again.")
          setIsConnected(false)
          setIsLoading(false)
        })

        setStatus("Ready to plan your trip")
      } catch (error) {
        console.error("[v0] Failed to initialize Vapi:", error)
        setStatus("Failed to initialize voice assistant")
        setConfigError("Unable to connect to voice service")
      }
    }

    initializeVapi()

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop()
      }
    }
  }, [onItineraryCapture])

  const startCall = async () => {
    if (!vapiRef.current || !configRef.current) {
      setStatus("Voice assistant not initialized")
      return
    }

    setIsLoading(true)

    try {
      if (configRef.current.assistantId) {
        // Start with pre-configured assistant
        await vapiRef.current.start(configRef.current.assistantId)
      } else {
        // Start with inline assistant configuration
        await vapiRef.current.start({
          name: "Travel Planner Assistant",
          firstMessage:
            "Hi! I'm your travel planning assistant. Tell me where you'd like to go, how many people are traveling, and what activities you're interested in.",
          model: {
            provider: "openai",
            model: "gpt-4o-mini",
            temperature: 0.7,
            messages: [
              {
                role: "system",
                content: `You are a friendly travel planning assistant. Your job is to:
1. Ask the user about their destination
2. Find out how many people are traveling (adults and children)
3. Learn about their interests and preferred activities
4. Keep responses under 30 words
5. Be enthusiastic and helpful

When you have gathered destination, number of travelers, and interests, call the capture_itinerary function.`,
              },
            ],
            functions: [
              {
                name: "capture_itinerary",
                description:
                  "Capture the user's travel plans including destination, number of travelers, and interests",
                parameters: {
                  type: "object",
                  properties: {
                    destination: {
                      type: "string",
                      description: "The destination city or location",
                    },
                    travelers: {
                      type: "number",
                      description: "Total number of people traveling",
                    },
                    interests: {
                      type: "string",
                      description: "User's interests and activity preferences",
                    },
                  },
                  required: ["destination", "travelers"],
                },
              },
            ],
          },
          voice: {
            provider: "11labs",
            voiceId: "21m00Tcm4TlvDq8ikWAM",
          },
        })
      }
    } catch (error) {
      console.error("[v0] Failed to start call:", error)
      setStatus("Failed to start voice assistant")
      setIsLoading(false)
    }
  }

  const stopCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop()
      setTranscript("")
    }
  }

  if (configError) {
    return (
      <Card className="p-6 bg-muted border-border">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-muted-foreground/10">
              <Mic className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Voice Planning</h3>
              <p className="text-sm text-muted-foreground">Configuration required</p>
            </div>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">{configError}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Add your Vapi public key in the <strong>Vars</strong> section to enable voice planning.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Mic className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Voice Planning</h3>
            <p className="text-sm text-muted-foreground">Speak your travel plans naturally</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            size="lg"
            onClick={isConnected ? stopCall : startCall}
            disabled={isLoading}
            className={`rounded-full w-20 h-20 ${
              isConnected ? "bg-destructive hover:bg-destructive/90 animate-pulse" : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : isConnected ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-foreground">{status}</p>
        </div>

        {transcript && (
          <div className="mt-2 p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">You said:</p>
            <p className="text-sm text-foreground">{transcript}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center">
          <p>
            Try saying: "I want to visit San Francisco with 2 adults and 1 child. We love museums and outdoor
            activities."
          </p>
        </div>
      </div>
    </Card>
  )
}
