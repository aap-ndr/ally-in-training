// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AmbassadorData {
  name?: string;
  email?: string;
  age?: string;
  city?: string;
  state?: string;
  country?: string;
  message?: string;
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const AMBASSADOR_URL = process.env.EXPO_PUBLIC_AMBASSADOR_FUNCTION_URL ?? "";
const FEEDBACK_URL = process.env.EXPO_PUBLIC_FEEDBACK_FUNCTION_URL ?? "";

// ---------------------------------------------------------------------------
// Save ambassador data — backend (primary) + Firestore support_requests (secondary)
// ---------------------------------------------------------------------------

export async function saveAmbassadorData(data: AmbassadorData): Promise<void> {
  const res = await fetch(AMBASSADOR_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg =
      (err as { error?: string })?.error ??
      "Failed to save. Please check your connection and try again.";
    throw new Error(msg);
  }
}

export interface FeedbackData {
  name?: string;
  email?: string;
  message: string;
}

export async function saveFeedbackData(data: FeedbackData): Promise<void> {
  const res = await fetch(FEEDBACK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg =
      (err as { error?: string })?.error ??
      "Failed to send feedback. Please check your connection and try again.";
    throw new Error(msg);
  }
}

export async function submitAmbassadorApplication(
  data: Required<Pick<AmbassadorData, "name" | "email" | "age" | "city" | "country">> &
    Pick<AmbassadorData, "state" | "message">
): Promise<void> {
  return saveAmbassadorData(data);
}
