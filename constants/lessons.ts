// The curriculum has 6 levels. `level` is the display name and
// `levelNumber` is its position, so lessons can be sorted/filtered by
// stage without parsing strings.
export type Level =
  | 'Foundation'
  | 'Everyday English'
  | 'Tenses'
  | 'Intermediate Grammar'
  | 'Advanced English'
  | 'Fluency';

// Broad content type, independent of level — e.g. "Grammar" lessons exist
// in both Foundation and Intermediate Grammar.
export type Category = 'Grammar' | 'Everyday English' | 'Tenses' | 'Vocabulary' | 'Speaking';

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

export type SentenceStructure = {
  label: string; // e.g. "Positive", "Negative", "Question"
  pattern: string; // e.g. "Subject + Verb (+s/es)"
};

export type CommonMistake = {
  wrong: string;
  correct: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  level: Level;
  levelNumber: number;
  // A topic grouping within the level, e.g. "Present Simple" — several
  // lessons can eventually share a module via matching moduleId.
  module: string;
  moduleId: string;
  // This lesson's position within its module.
  lessonNumber: number;
  category: Category;
  topic: string;
  difficulty: Difficulty;
  romanUrdu: string;
  english: string;
  naturalEnglish: string;
  // Present only on lessons that teach a specific grammar point.
  grammarPoint?: string;
  explanation: string;
  // When this grammar point applies, e.g. "habits", "facts" — mainly for
  // tense lessons.
  uses?: string[];
  // Sentence-building patterns, e.g. Positive/Negative/Question templates —
  // mainly for tense lessons.
  structures?: SentenceStructure[];
  // Extra contrasting/contextual sentences beyond the main phrase. Not
  // every lesson needs them, so the engine treats this as optional.
  examples?: LessonExample[];
  // Tense/grammar lessons can break examples out by sentence type instead
  // of (or alongside) the generic `examples` list above.
  positiveExamples?: LessonExample[];
  negativeExamples?: LessonExample[];
  questionExamples?: LessonExample[];
  commonMistakes?: CommonMistake[];
  // A single check-for-understanding question, when relevant.
  practiceQuestions?: PracticeQuestion[];
  // Open-ended prompt for the Speaking step, when relevant.
  speakingPrompt?: string;
};

// This is a small sample set proving the data model supports the full
// 6-level curriculum, not the full lesson library. The real curriculum
// will contain hundreds of lessons built on this same shape.
export const lessons: Lesson[] = [
  {
    id: '1',
    level: 'Foundation',
    levelNumber: 1,
    module: 'Sentence Structure',
    moduleId: 'sentence-structure',
    lessonNumber: 1,
    category: 'Grammar',
    topic: 'Basic English Sentence Structure',
    difficulty: 1,
    romanUrdu: 'Main school jaata hoon.',
    english: 'I go to school.',
    naturalEnglish: 'I go to school.',
    grammarPoint: 'Subject + Verb + Object',
    explanation:
      'A basic English sentence follows Subject + Verb + Object order: who does the action, the action, then what it affects.',
    examples: [
      {
        romanUrdu: 'Woh cricket khelta hai.',
        english: 'He plays cricket.',
        note: 'He (subject) + plays (verb) + cricket (object)',
      },
      { romanUrdu: 'Hum khana khaate hain.', english: 'We eat food.' },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the sentence with the correct word order',
        options: ['Cricket he plays.', 'He plays cricket.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Make one simple sentence about yourself using Subject + Verb + Object.',
  },
  {
    id: '2',
    level: 'Foundation',
    levelNumber: 1,
    module: 'Pronouns',
    moduleId: 'pronouns',
    lessonNumber: 1,
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
        options: ['Sara is a doctor. Sara works a lot.', 'Sara is a doctor. She works a lot.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Describe a friend, then say the same sentence again using "he" or "she".',
  },
  {
    id: '3',
    level: 'Everyday English',
    levelNumber: 2,
    module: 'Everyday Conversations',
    moduleId: 'everyday-conversations',
    lessonNumber: 1,
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
    id: '4',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Present Simple',
    moduleId: 'present-simple',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Present Simple',
    difficulty: 2,
    romanUrdu: 'Main roz office jaata hoon.',
    english: 'I go to the office every day.',
    naturalEnglish: 'I go to the office every day.',
    grammarPoint: 'Present Simple',
    explanation:
      'Present Simple describes actions that happen regularly — not just right now, but as a repeated pattern, habit, or fact. Think of it as describing "what is generally true", not "what is happening this second".',
    uses: [
      'Regular actions — things you do again and again',
      'Habits — things you usually do',
      'Routines — your normal daily pattern',
      'Facts — things that are always true',
      'Things that are generally true',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + Verb (+s/es for he/she/it)' },
      { label: 'Negative', pattern: "Subject + don't/doesn't + base verb" },
      { label: 'Question', pattern: 'Do/Does + subject + base verb?' },
    ],
    positiveExamples: [
      { romanUrdu: 'Main roz office jaata hoon.', english: 'I go to the office every day.' },
      { romanUrdu: 'Main subah chai peeta hoon.', english: 'I drink tea in the morning.' },
      {
        romanUrdu: 'Usko cricket pasand hai.',
        english: 'He likes cricket.',
        note: 'He/She/It → add -s or -es to the verb (likes, goes, watches)',
      },
    ],
    negativeExamples: [
      {
        romanUrdu: 'Main roz coffee nahi peeta.',
        english: "I don't drink coffee every day.",
      },
      {
        romanUrdu: 'Usko cricket pasand nahi hai.',
        english: "He doesn't like cricket.",
        note: 'He/She/It → doesn\'t + base verb — never "doesn\'t likes"',
      },
    ],
    questionExamples: [
      {
        romanUrdu: 'Kya tum roz office jaate ho?',
        english: 'Do you go to the office every day?',
      },
      {
        romanUrdu: 'Kya woh cricket khelta hai?',
        english: 'Does he play cricket?',
        note: 'He/She/It → Does + base verb — never "Does he plays"',
      },
    ],
    commonMistakes: [
      {
        wrong: 'He go to office every day.',
        correct: 'He goes to the office every day.',
        explanation: 'With he/she/it, add -s or -es to the verb.',
      },
      {
        wrong: "He doesn't likes cricket.",
        correct: "He doesn't like cricket.",
        explanation: "After doesn't, use the base verb — no extra -s.",
      },
      {
        wrong: 'Does he goes to office?',
        correct: 'Does he go to the office?',
        explanation: 'After does, use the base verb — no extra -s.',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['He go to office every day.', 'He goes to the office every day.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt:
      'Say two things you do every day — for example, what time you wake up and what you do after work.',
  },
  {
    id: '5',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Present Continuous',
    moduleId: 'present-continuous',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Present Continuous',
    difficulty: 2,
    romanUrdu: 'Main abhi office jaara hoon.',
    english: 'I am going to the office now.',
    naturalEnglish: 'I am going to the office now.',
    grammarPoint: 'Present Continuous',
    explanation: 'We use the present continuous for something happening right now, or around this time.',
    examples: [
      { romanUrdu: 'Woh abhi khana kha raha hai.', english: 'He is eating food right now.' },
      {
        romanUrdu: 'Is hafte main ek naya project kar raha hoon.',
        english: 'I am working on a new project this week.',
        note: 'Happening around now, not this exact second',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the sentence for something happening right now',
        options: ['I am going to the office now.', 'I go to the office every day.'],
        correctIndex: 0,
      },
    ],
    speakingPrompt: 'Say one thing you are doing right now.',
  },
  {
    id: '6',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Tense Comparison',
    moduleId: 'tense-comparison',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Present Simple vs Present Continuous',
    difficulty: 3,
    romanUrdu: 'Main roz office jaata hoon.',
    english: 'I go to the office every day.',
    naturalEnglish: 'I go to the office every day.',
    grammarPoint: 'Present Simple vs Present Continuous',
    explanation:
      'Present simple is for regular actions. Present continuous is for something happening right now. Comparing them side by side helps you choose the right one.',
    examples: [
      {
        romanUrdu: 'Main abhi office jaara hoon.',
        english: 'I am going to the office now.',
        note: 'Present Continuous — happening now',
      },
      {
        romanUrdu: 'Main roz chai peeta hoon.',
        english: 'I drink tea every day.',
        note: 'Present Simple — daily habit',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence for a daily routine',
        options: ['I am going to the office every day.', 'I go to the office every day.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Say one thing you do every day, and one thing you are doing right now.',
  },
  {
    id: '7',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Past Simple',
    moduleId: 'past-simple',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Past Simple',
    difficulty: 2,
    romanUrdu: 'Kal maine office mein kaam kiya.',
    english: 'Yesterday I worked at the office.',
    naturalEnglish: 'I worked at the office yesterday.',
    grammarPoint: 'Past Simple',
    explanation: 'We use the past simple for actions that started and finished in the past.',
    examples: [
      { romanUrdu: 'Humne pichle hafte movie dekhi.', english: 'We watched a movie last week.' },
      {
        romanUrdu: 'Woh school gaya tha.',
        english: 'He went to school.',
        note: '"went" — irregular past form of "go"',
      },
    ],
    practiceQuestions: [
      {
        prompt: 'Choose the correct past simple sentence',
        options: ['I go to the office yesterday.', 'I went to the office yesterday.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Say one thing you did yesterday.',
  },
  {
    id: '8',
    level: 'Intermediate Grammar',
    levelNumber: 4,
    module: 'Modal Verbs',
    moduleId: 'modal-verbs',
    lessonNumber: 1,
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
    id: '9',
    level: 'Advanced English',
    levelNumber: 5,
    module: 'Phrasal Verbs',
    moduleId: 'phrasal-verbs',
    lessonNumber: 1,
    category: 'Vocabulary',
    topic: 'Phrasal Verbs in Professional English',
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
    id: '10',
    level: 'Fluency',
    levelNumber: 6,
    module: 'Self-Introduction',
    moduleId: 'self-introduction',
    lessonNumber: 1,
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
