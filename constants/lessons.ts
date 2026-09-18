export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export type Category = 'Everyday English' | 'Grammar' | 'Vocabulary' | 'Speaking';

// 1 = easiest, 5 = hardest. Independent of `level` so lessons within the
// same level can still be ordered by difficulty later.
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type LessonExample = {
  romanUrdu: string;
  english: string;
  // Optional short note, e.g. contrasting grammar or a related word form.
  note?: string;
};

export type PracticeQuestion = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type Lesson = {
  id: string;
  level: Level;
  category: Category;
  topic: string;
  difficulty: Difficulty;
  romanUrdu: string;
  english: string;
  naturalEnglish: string;
  // Present only on lessons that teach a specific grammar point.
  grammarPoint?: string;
  explanation: string;
  // Extra contrasting/contextual sentences beyond the main phrase. Not
  // every lesson needs them, so the engine treats this as optional.
  examples?: LessonExample[];
  // A single check-for-understanding question, when relevant.
  practiceQuestions?: PracticeQuestion[];
  // Open-ended prompt for the Speaking step, when relevant.
  speakingPrompt?: string;
};

// This is a small sample set proving the lesson engine supports the full
// curriculum (everyday phrases through advanced/speaking content), not
// the full lesson library. The real curriculum will contain hundreds of
// lessons built on this same shape.
export const lessons: Lesson[] = [
  {
    id: '1',
    level: 'Beginner',
    category: 'Everyday English',
    topic: 'Talking About How You Feel',
    difficulty: 1,
    romanUrdu: 'Mereku bhook lagi hai.',
    english: 'I am hungry.',
    naturalEnglish: "I'm hungry.",
    explanation: 'Use "I am ___" or "I\'m ___" to talk about how you feel right now.',
    examples: [
      { romanUrdu: 'Mereku neend aa rahi hai.', english: "I'm sleepy." },
      {
        romanUrdu: 'Mereku thodi tabiyat kharab hai.',
        english: "I'm feeling a bit under the weather.",
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['I am hungry.', 'I hungry am.'],
        correctIndex: 0,
      },
    ],
    speakingPrompt: 'Tell me how you are feeling right now, in English.',
  },
  {
    id: '2',
    level: 'Beginner',
    category: 'Grammar',
    topic: 'Present Simple vs Present Continuous',
    difficulty: 2,
    romanUrdu: 'Main roz office jaata hoon.',
    english: 'I go to the office every day.',
    naturalEnglish: 'I go to the office every day.',
    grammarPoint: 'Present Simple',
    explanation: 'We use the present simple for regular or repeated actions.',
    examples: [
      {
        romanUrdu: 'Main abhi office jaara hoon.',
        english: 'I am going to the office now.',
        note: 'Present Continuous — used for something happening right now.',
      },
      { romanUrdu: 'Main roz chai peeta hoon.', english: 'I drink tea every day.' },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence for a daily routine',
        options: [
          'I am going to the office every day.',
          'I go to the office every day.',
        ],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Say one thing you do every day, and one thing you are doing right now.',
  },
  {
    id: '3',
    level: 'Beginner',
    category: 'Grammar',
    topic: 'Pronouns',
    difficulty: 1,
    romanUrdu: 'Ali school jaata hai. Ali cricket bhi khelta hai.',
    english: 'Ali goes to school. Ali also plays cricket.',
    naturalEnglish: 'Ali goes to school. He also plays cricket.',
    grammarPoint: 'Pronouns',
    explanation: 'Instead of repeating a name, we use a pronoun like "he", "she" or "it".',
    examples: [
      {
        romanUrdu: 'Sara doctor hai. Sara bahut kaam karti hai.',
        english: 'Sara is a doctor. She works a lot.',
        note: '"Sara" → "she"',
      },
      {
        romanUrdu: 'Yeh mera phone hai. Yeh naya hai.',
        english: 'This is my phone. It is new.',
        note: '"phone" → "it"',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: [
          'Sara is a doctor. Sara works a lot.',
          'Sara is a doctor. She works a lot.',
        ],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Describe a friend, then say the same sentence again using "he" or "she".',
  },
  {
    id: '4',
    level: 'Beginner',
    category: 'Vocabulary',
    topic: 'Word in Context: Improve',
    difficulty: 2,
    romanUrdu: 'Mereku apni English improve karni hai.',
    english: 'I want to improve my English.',
    naturalEnglish: 'I want to improve my English.',
    explanation:
      '"Improve" means to get better at something. Roman Urdu speakers often use it directly, just like in English.',
    examples: [
      {
        romanUrdu: 'Mereku apni communication skills improve karni hain.',
        english: 'I need to improve my communication skills.',
      },
      {
        romanUrdu: 'Meri English bahut improve ho gayi hai.',
        english: 'My English has improved a lot.',
        note: '"improved" — past form',
      },
      {
        romanUrdu: 'Yeh ek achha improvement hai.',
        english: 'This is a good improvement.',
        note: '"improvement" — noun form',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['My English has improve a lot.', 'My English has improved a lot.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Say one thing about yourself that is improving.',
  },
  {
    id: '5',
    level: 'Intermediate',
    category: 'Grammar',
    topic: 'Modal Verbs: Should',
    difficulty: 3,
    romanUrdu: 'Mereku lagta hai tumhe doctor ko dikhana chahiye.',
    english: 'I think you should see a doctor.',
    naturalEnglish: 'I think you should see a doctor.',
    grammarPoint: 'Modal Verbs (should)',
    explanation: 'We use "should" to give advice or say what is a good idea.',
    examples: [
      { romanUrdu: 'Tumhe jaldi sona chahiye.', english: 'You should sleep early.' },
      { romanUrdu: 'Humein zyada paani peena chahiye.', english: 'We should drink more water.' },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['You should to see a doctor.', 'You should see a doctor.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Give a friend one piece of advice using "should".',
  },
  {
    id: '6',
    level: 'Advanced',
    category: 'Vocabulary',
    topic: 'Phrasal Verbs at Work',
    difficulty: 4,
    romanUrdu: 'Mereku yeh project jaldi wrap up karna hai.',
    english: 'I need to wrap up this project quickly.',
    naturalEnglish: 'I need to wrap up this project quickly.',
    grammarPoint: 'Phrasal Verbs',
    explanation:
      '"Wrap up" means to finish something. Phrasal verbs like this sound more natural than formal words like "complete" in everyday conversation.',
    examples: [
      {
        romanUrdu: 'Mereku is issue ko sort out karna hai.',
        english: 'I need to sort out this issue.',
        note: '"sort out" = resolve',
      },
      {
        romanUrdu: 'Chalo is topic ko follow up karte hain kal.',
        english: "Let's follow up on this topic tomorrow.",
        note: '"follow up" = check on something later',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: [
          'I need to finish up this project quickly.',
          'I need to wrap up this project quickly.',
        ],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Use one phrasal verb (wrap up, sort out, or follow up) in a work sentence.',
  },
  {
    id: '7',
    level: 'Intermediate',
    category: 'Speaking',
    topic: 'Introducing Yourself',
    difficulty: 3,
    romanUrdu: 'Interview mein apna introduction kaise dete hain?',
    english: 'How do you introduce yourself in an interview?',
    naturalEnglish: 'How do you introduce yourself in an interview?',
    explanation:
      'A good introduction is short, clear, and confident: your name, what you do, and one interesting detail.',
    examples: [
      {
        romanUrdu: 'Hi, mera naam Ayesha hai. Main software developer hoon.',
        english: "Hi, I'm Ayesha. I work as a software developer.",
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the more natural introduction',
        options: ['I am software developer.', "I'm a software developer."],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Now introduce yourself in English, just like in an interview.',
  },
];
