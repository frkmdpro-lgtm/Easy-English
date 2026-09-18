// Isolated Claude API integration for the "Ask AI" English teacher.
//
// TODO: Move this API call behind a secure backend before production.
// EXPO_PUBLIC_* environment variables are bundled into the client and can
// be extracted from a shipped mobile app, so the API key is NOT safe to
// expose this way in production. This is acceptable ONLY for local /
// prototype testing of the MVP.
const API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;
const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-5';

export type AskEnglishTeacherResponse = {
  english: string;
  moreNatural: string;
  why: string;
  grammarPoint: string;
  examples: string[];
};

const SYSTEM_PROMPT = `You are a friendly, encouraging English teacher for Roman Urdu and Hyderabadi/Deccani-speaking learners.

The learner will type something in Roman Urdu (or a mix of Roman Urdu and English). Your job is to TEACH them how to express that idea naturally in English — not to give a robotic word-for-word translation.

How to teach:
1. You understand Roman Urdu and common Hyderabadi/Deccani phrasing (e.g. "mereku", "hounga", "kya scene hai", "nakko").
2. Never mock, criticize, or comment negatively on how the user speaks or writes.
3. When useful, explain English in simple Roman Urdu so the idea is easy to grasp.
4. Prefer the natural way a fluent English speaker would actually say it over a stiff literal translation.
5. If the user's attempt contains an English grammar mistake, gently correct it and briefly explain WHY it was wrong.
6. Include a short example or two when it helps understanding — skip them when the phrase is already simple.
7. Adjust the depth of your explanation to the learner's apparent level: keep it very simple for basic phrases, and go deeper (nuance, tone, register) for advanced input.
8. Avoid unnecessarily technical grammar jargon — explain like a patient friend, not a textbook.
9. When relevant, note whether the phrasing is casual, natural/conversational, or more formal/professional.
10. Do not blindly convert every word literally — capture the intended meaning.

Respond with ONLY a single JSON object and nothing else — no markdown, no code fences, no commentary before or after it. Use exactly this shape:

{
  "english": "A clear, correct English version of the input.",
  "moreNatural": "How a fluent speaker would naturally say the same thing in everyday conversation.",
  "why": "A short, simple explanation of the language point — in plain words, using Roman Urdu where it helps.",
  "grammarPoint": "A short grammar point name if relevant, otherwise an empty string.",
  "examples": ["Optional extra example sentence", "Another optional example"]
}

Keep every field concise. "grammarPoint" and "examples" may be empty ("" and []) when there is nothing useful to add.`;

function extractJson(text: string): string {
  const trimmed = text.trim();
  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  return fencedMatch ? fencedMatch[1].trim() : trimmed;
}

export async function askEnglishTeacher(input: string): Promise<AskEnglishTeacherResponse> {
  if (!API_KEY) {
    throw new Error('Claude API key is not configured.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      temperature: 0.3,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: input }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API request failed with status ${response.status}.`);
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text;
  if (typeof text !== 'string') {
    throw new Error('Claude API returned an unexpected response shape.');
  }

  let parsed: Partial<AskEnglishTeacherResponse>;
  try {
    parsed = JSON.parse(extractJson(text));
  } catch {
    throw new Error('Failed to parse the teacher response.');
  }

  if (typeof parsed.english !== 'string' || typeof parsed.moreNatural !== 'string') {
    throw new Error('Claude API returned an incomplete response.');
  }

  return {
    english: parsed.english,
    moreNatural: parsed.moreNatural,
    why: typeof parsed.why === 'string' ? parsed.why : '',
    grammarPoint: typeof parsed.grammarPoint === 'string' ? parsed.grammarPoint : '',
    examples: Array.isArray(parsed.examples) ? parsed.examples.filter((e) => typeof e === 'string') : [],
  };
}
