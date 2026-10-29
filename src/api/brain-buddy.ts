/**
 * Brain Buddy - AI Chatbot API for neurodiversity questions
 * Powered by Youth for Neurodiversity RAG API
 */

export interface BrainBuddyResponse {
  answer: string;
  agent: string;
}

export interface BrainBuddyError {
  error: string;
  message: string;
}

const RAG_API_URL = "https://ynd-rag-api.onrender.com/ask";

/**
 * Ask Brain Buddy a question about neurodiversity
 * @param question - The user's question
 * @returns The AI-generated answer
 */
export async function askBrainBuddy(question: string): Promise<string> {
  try {
    const response = await fetch(RAG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      console.log("Brain Buddy API error:", response.status);
      return "Sorry, I'm having trouble answering right now. Please try again.";
    }

    const data: BrainBuddyResponse = await response.json();

    if (!data.answer || data.answer.trim() === "") {
      return "I didn't get an answer. Can you try rephrasing?";
    }

    return data.answer;
  } catch (error) {
    console.log("Brain Buddy fetch error:", error);
    return "Sorry, I'm having trouble answering right now. Please try again.";
  }
}
