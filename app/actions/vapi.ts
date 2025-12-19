"use server";

import { logger } from "@/lib/logger";

export async function getVapiConfig() {
  logger.apiRequest("getVapiConfig", "GET");

  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

  if (!publicKey) {
    logger.warn("VAPI configuration missing", {
      reason: "NEXT_PUBLIC_VAPI_PUBLIC_KEY not set",
    });

    return {
      error:
        "Vapi is not configured. Please add NEXT_PUBLIC_VAPI_PUBLIC_KEY to your environment variables.",
    };
  }

  logger.apiResponse("getVapiConfig", "success", undefined, {
    hasAssistantId: !!assistantId,
  });

  return {
    publicKey,
    assistantId: assistantId || null,
  };
}
