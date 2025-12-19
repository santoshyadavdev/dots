# Dots - Family Travel Planner

Plan your perfect family adventure with kid-friendly activities and parent-approved itineraries.

## Features

- **Voice Planning**: Speak your travel plans naturally using AI-powered voice assistant
- **Activity Discovery**: Browse curated kid-friendly activities and attractions
- **Smart Filtering**: Filter by age, budget, environment, and educational level
- **Interactive Maps**: Connect the dots between activities for optimal route planning
- **Search & Save**: Find activities by destination and save favorites

## Voice Integration

This app includes Vapi voice integration that allows users to:
- Speak their destination and travel details
- Specify number of travelers naturally
- Describe interests and preferences
- Get automatic search results

See [VAPI_SETUP.md](./VAPI_SETUP.md) for detailed setup instructions.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Vapi account (for voice features)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Add your Vapi API keys to `.env.local`

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Required for voice features:
- `NEXT_PUBLIC_VAPI_PUBLIC_KEY` - Your Vapi public API key

Optional:
- `NEXT_PUBLIC_VAPI_ASSISTANT_ID` - Pre-configured assistant ID

See [VAPI_SETUP.md](./VAPI_SETUP.md) for detailed setup.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Voice**: Vapi AI
- **Icons**: Lucide React

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── page.tsx         # Main page with voice planner
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── voice-planner.tsx       # Voice integration component
│   ├── search-bar.tsx          # Manual search
│   ├── activity-grid.tsx       # Activity listings
│   └── ui/                     # shadcn/ui components
└── lib/                 # Utilities
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.
