import * as Speech from 'expo-speech';

export function speak(text: string) {
  Speech.stop();
  Speech.speak(text, { language: 'en-US' });
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

// Mock speech recognition for the MVP: real device microphone STT needs a
// native module that isn't available in Expo Go. This simulates a short
// "listening" delay and returns a recognized transcript that is usually
// close to the expected sentence. Swap the body of this function for a
// real speech-to-text call later — the signature stays the same.
export async function recognizeSpeech(expected: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const isCloseMatch = Math.random() < 0.75;
  if (isCloseMatch) {
    return expected;
  }

  const words = expected.split(' ');
  words.pop();
  return words.join(' ') || expected;
}

export function isApproximateMatch(transcript: string, expected: string): boolean {
  const a = normalize(transcript);
  const b = normalize(expected);
  if (a === b) return true;

  const aWords = new Set(a.split(/\s+/).filter(Boolean));
  const bWords = b.split(/\s+/).filter(Boolean);
  if (bWords.length === 0) return false;

  const matchedWords = bWords.filter((word) => aWords.has(word)).length;
  return matchedWords / bWords.length >= 0.7;
}
