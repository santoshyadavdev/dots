# Vapi Voice Integration Setup Guide

This travel planner app now includes voice-based itinerary planning powered by Vapi. Users can speak naturally about their travel plans instead of typing.

## Quick Setup

### 1. Get Your Vapi API Keys

1. Sign up at [Vapi Dashboard](https://dashboard.vapi.ai/)
2. Navigate to **Settings** → **API Keys**
3. Copy your **Public Key** (starts with `vapi-pub-`)

⚠️ **Important**: Use only your PUBLIC key for this integration. Never use your private API key in client-side code.

### 2. Add Environment Variables

**In v0:**
1. Click **Vars** in the left sidebar
2. Add the variable:
   - Name: `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
   - Value: Your public key (e.g., `vapi-pub-...`)

**For local development:**
Create `.env.local` and add:

```bash
# Required: Your Vapi PUBLIC key (safe to expose client-side)
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_public_key_here

# Optional: Pre-configured assistant ID (if you create one)
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_assistant_id_here
```

### 3. Security Note

✅ **Safe to use client-side**: `NEXT_PUBLIC_VAPI_PUBLIC_KEY`
- This is a PUBLIC key designed for browser use
- It can only start calls with your configured assistants
- Cannot access billing, account settings, or sensitive data
- Similar to Stripe's `pk_` public keys or Google Maps API keys

❌ **Never expose**: Your private API key
- Keep your private key server-side only
- Used for creating assistants, managing settings, and billing

This security model is intentional and follows industry best practices for client-side API integrations.

### 4. Deploy and Test

The voice planner will automatically appear on the homepage. Users can:
- Click the microphone button to start voice planning
- Speak their destination, number of travelers, and interests
- See the transcription in real-time
- Have their search automatically populated

## How It Works

### Voice Planner Component

The `VoicePlanner` component (`components/voice-planner.tsx`) handles:
- Voice conversation initialization with Vapi
- Real-time transcription display
- Extraction of travel details (destination, travelers, interests)
- Automatic search form population

### Assistant Configuration

The app uses an inline assistant configuration with:
- **Model**: GPT-4o-mini for fast, cost-effective responses
- **Voice**: ElevenLabs natural-sounding voice
- **Function**: `capture_itinerary` - extracts structured travel data

### Data Flow

1. User clicks microphone → Vapi call starts
2. User speaks: "I want to visit San Francisco with 2 adults and 1 child. We love museums."
3. Assistant asks clarifying questions if needed
4. Assistant calls `capture_itinerary` function with extracted data
5. App receives data and updates search parameters
6. Activity grid shows relevant results

## Advanced Configuration

### Creating a Custom Assistant

For better control, create a pre-configured assistant in the Vapi Dashboard:

1. Go to **Assistants** → **Create New**
2. Configure your assistant with this system prompt:

```
You are a friendly travel planning assistant. Your job is to:
1. Ask the user about their destination
2. Find out how many people are traveling (adults and children)
3. Learn about their interests and preferred activities
4. Keep responses under 30 words
5. Be enthusiastic and helpful

When you have gathered destination, number of travelers, and interests, call the capture_itinerary function.
```

3. Add the `capture_itinerary` function:

```json
{
  "name": "capture_itinerary",
  "description": "Capture the user's travel plans",
  "parameters": {
    "type": "object",
    "properties": {
      "destination": {
        "type": "string",
        "description": "The destination city or location"
      },
      "travelers": {
        "type": "number",
        "description": "Total number of people traveling"
      },
      "interests": {
        "type": "string",
        "description": "User's interests and activity preferences"
      }
    },
    "required": ["destination", "travelers"]
  }
}
```

4. Copy the Assistant ID and add it to your environment variables

### Customizing the Voice

You can change the voice provider and voice ID in `voice-planner.tsx`:

```typescript
voice: {
  provider: "11labs", // or "deepgram", "playht", "azure"
  voiceId: "21m00Tcm4TlvDq8ikWAM", // Browse voices in Vapi Dashboard
}
```

### Handling More Complex Conversations

Extend the function to capture additional details:

```typescript
{
  name: "capture_detailed_itinerary",
  parameters: {
    type: "object",
    properties: {
      destination: { type: "string" },
      travelers: { type: "number" },
      adults: { type: "number" },
      children: { type: "number" },
      childrenAges: { type: "array", items: { type: "number" } },
      interests: { type: "string" },
      budget: { type: "string", enum: ["budget", "moderate", "luxury"] },
      travelDates: { type: "string" },
      specialNeeds: { type: "string" }
    }
  }
}
```

## Troubleshooting

### Voice Assistant Not Starting

- Check that `NEXT_PUBLIC_VAPI_PUBLIC_KEY` is set correctly in the **Vars** section
- Verify microphone permissions in your browser
- Check browser console for error messages

### No Audio

- Ensure your device has working speakers/headphones
- Check browser audio permissions
- Try a different browser (Chrome/Edge recommended)

### Transcription Not Appearing

- The assistant uses speech-to-text that requires clear audio
- Speak clearly and at a moderate pace
- Check your internet connection

### Function Not Being Called

- Ensure users provide all required information
- The assistant might need more context - try being more explicit
- Check the Vapi Dashboard logs for function call attempts

## Cost Considerations

Vapi pricing is based on:
- Voice minutes used
- AI model API calls (OpenAI in this case)
- Voice synthesis (ElevenLabs)

Free tier includes 10 minutes/month. See [Vapi Pricing](https://vapi.ai/pricing) for details.

## Resources

- [Vapi Documentation](https://docs.vapi.ai/)
- [Vapi Web SDK GitHub](https://github.com/VapiAI/web)
- [Vapi Dashboard](https://dashboard.vapi.ai/)
- [Support Discord](https://discord.gg/pUFNcf2WmH)
