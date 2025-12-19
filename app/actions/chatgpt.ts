"use server";

import OpenAI from "openai";
import { logger } from "@/lib/logger";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTravelRecommendations(params: {
  destination: string;
  travelers: number;
  interests: string;
}) {
  const startTime = Date.now();

  logger.apiRequest("generateTravelRecommendations", "POST", {
    destination: params.destination,
    travelers: params.travelers,
    interests: params.interests.substring(0, 50) + "...", // Truncate for logging
  });

  try {
    logger.debug("Calling OpenAI API", { model: "gpt-4o-mini" });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a family travel expert. Generate kid-friendly activity recommendations based on user input. Return a JSON object with an "activities" array. Each activity should have: name, description, kidFriendliness (1-5), parentSanity (1-5), tags (array), budget (low/medium/high), environment (indoor/outdoor), educationalLevel (play/mixed/educational), napTimeFriendly (boolean).`,
        },
        {
          role: "user",
          content: `Destination: ${params.destination}, Travelers: ${params.travelers}, Interests: ${params.interests}. Generate 4 personalized family-friendly activities.`,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const duration = Date.now() - startTime;
    const data = JSON.parse(
      completion.choices[0].message.content || '{"activities": []}'
    );

    logger.apiResponse("generateTravelRecommendations", "success", duration, {
      activitiesCount: data.activities?.length || 0,
      tokensUsed: completion.usage?.total_tokens,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.apiError("generateTravelRecommendations", error, {
      duration,
      destination: params.destination,
    });

    return {
      success: false,
      error: "Failed to generate recommendations",
    };
  }
}
