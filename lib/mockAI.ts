export type AskAIResponse = {
  english: string;
  naturalEnglish: string;
  explanation: string;
};

// Simple canned responses keyed by a few common Roman Urdu phrases.
// Replace this whole function body with a call to the Claude API later —
// the signature (input string in, AskAIResponse out) stays the same.
const cannedResponses: { match: string[]; response: AskAIResponse }[] = [
  {
    match: ['late hounga', 'late ho jaunga', 'boss ko bolna hai'],
    response: {
      english: "I'll be late.",
      naturalEnglish: "I'm running late.",
      explanation: 'Late hounga → I\'ll be late / I\'m running late',
    },
  },
  {
    match: ['bhook lagi hai'],
    response: {
      english: 'I am hungry.',
      naturalEnglish: "I'm hungry.",
      explanation: 'Bhook lagi hai → I am hungry',
    },
  },
  {
    match: ['thak gaya', 'thak gayi'],
    response: {
      english: 'I am tired.',
      naturalEnglish: "I'm tired.",
      explanation: 'Thak gaya/gayi → I am tired',
    },
  },
];

function normalize(text: string) {
  return text.trim().toLowerCase();
}

export async function translateToEnglish(romanUrdu: string): Promise<AskAIResponse> {
  const input = normalize(romanUrdu);

  const found = cannedResponses.find((entry) =>
    entry.match.some((phrase) => input.includes(phrase))
  );

  if (found) {
    return found.response;
  }

  return {
    english: romanUrdu,
    naturalEnglish: romanUrdu,
    explanation: "We don't have a natural translation for this phrase yet — try one of the sample lessons!",
  };
}
