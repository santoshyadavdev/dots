"use server"

export async function getVapiConfig() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

  if (!publicKey) {
    return {
      error: "Vapi is not configured. Please add NEXT_PUBLIC_VAPI_PUBLIC_KEY to your environment variables.",
    }
  }

  return {
    publicKey,
    assistantId: assistantId || null,
  }
}
