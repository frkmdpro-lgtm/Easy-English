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

// Generic enough to contrast any two structures later, e.g.
// Present Simple vs Present Continuous, Will vs Going To, Say vs Tell.
export type ComparisonSide = {
  label: string; // e.g. "Present Simple"
  romanUrdu: string;
  english: string;
};

export type Comparison = {
  title: string; // e.g. "Present Simple vs Present Continuous"
  firstExample: ComparisonSide;
  secondExample: ComparisonSide;
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
  // A short contrast against a related structure, when relevant, e.g.
  // Present Simple vs Present Continuous.
  comparison?: Comparison;
  // A single check-for-understanding question, when relevant.
  practiceQuestions?: PracticeQuestion[];
  // Open-ended prompt for the Speaking step, when relevant.
  speakingPrompt?: string;
};

// This is a small sample set proving the data model supports the full
// 6-level curriculum, not the full lesson library. The real curriculum
// will contain hundreds of lessons built on this same shape. The Tenses
// module (lessons 4–15) is fully built out as the first complete module;
// every other module still has one representative lesson.
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

  // ===================== TENSES MODULE (12 lessons) =====================

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
      { romanUrdu: 'Main roz coffee nahi peeta.', english: "I don't drink coffee every day." },
      {
        romanUrdu: 'Usko cricket pasand nahi hai.',
        english: "He doesn't like cricket.",
        note: 'He/She/It → doesn\'t + base verb — never "doesn\'t likes"',
      },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tum roz office jaate ho?', english: 'Do you go to the office every day?' },
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
    comparison: {
      title: 'Present Simple vs Present Continuous',
      firstExample: {
        label: 'Present Simple',
        romanUrdu: 'Main roz office jaata hoon.',
        english: 'I go to the office every day.',
      },
      secondExample: {
        label: 'Present Continuous',
        romanUrdu: 'Main abhi office jaara hoon.',
        english: 'I am going to the office now.',
      },
      explanation:
        'Present Simple is used for regular or repeated actions. Present Continuous is used for something happening now.',
    },
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
    explanation:
      'Present Continuous describes an action that is happening right now, or a temporary action happening around this period — not a permanent habit.',
    uses: [
      'Actions happening right now, at this moment',
      'Temporary actions happening around this time (this week, these days)',
      'Something in progress, even if not this exact second',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + am/is/are + verb-ing' },
      { label: 'Negative', pattern: 'Subject + am/is/are + not + verb-ing' },
      { label: 'Question', pattern: 'Am/Is/Are + subject + verb-ing?' },
    ],
    positiveExamples: [
      { romanUrdu: 'Main abhi office jaara hoon.', english: 'I am going to the office now.' },
      { romanUrdu: 'Woh abhi khana kha raha hai.', english: 'He is eating food right now.' },
      {
        romanUrdu: 'Hum log is hafte ek naya project kar rahe hain.',
        english: 'We are working on a new project this week.',
        note: 'Happening around now, not this exact second',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Main abhi kaam nahi kar raha.', english: "I am not working right now." },
      { romanUrdu: 'Woh abhi so nahi rahi hai.', english: "She is not sleeping right now." },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tum abhi busy ho?', english: 'Are you busy right now?' },
      {
        romanUrdu: 'Kya woh abhi office mein kaam kar raha hai?',
        english: 'Is he working at the office right now?',
      },
    ],
    commonMistakes: [
      {
        wrong: 'I am knowing him.',
        correct: 'I know him.',
        explanation: '"Know" is a state, not an action — we don\'t use it in continuous form.',
      },
      {
        wrong: 'She is liking this song.',
        correct: 'She likes this song.',
        explanation: '"Like" describes a feeling, not an ongoing action — use Present Simple.',
      },
      {
        wrong: 'He going to the office now.',
        correct: 'He is going to the office now.',
        explanation: "Don't forget the helping verb (am/is/are) before verb-ing.",
      },
    ],
    comparison: {
      title: 'Present Simple vs Present Continuous',
      firstExample: {
        label: 'Present Simple',
        romanUrdu: 'Main roz office jaata hoon.',
        english: 'I go to the office every day.',
      },
      secondExample: {
        label: 'Present Continuous',
        romanUrdu: 'Main abhi office jaara hoon.',
        english: 'I am going to the office now.',
      },
      explanation:
        'Present Simple is for regular routines. Present Continuous is for something happening right now or around this time.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['I am knowing the answer.', 'I know the answer.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Look around you — tell me three things that are happening right now.',
  },
  {
    id: '6',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Present Perfect',
    moduleId: 'present-perfect',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Present Perfect',
    difficulty: 3,
    romanUrdu: 'Maine woh movie dekhi hai.',
    english: 'I have seen that movie.',
    naturalEnglish: 'I have seen that movie.',
    grammarPoint: 'Present Perfect',
    explanation:
      "Present Perfect connects a past action to now — either the result still matters right now, or exactly when it happened isn't important. It links the past to the present moment, not just \"something that happened before\".",
    uses: [
      "An action that happened at an unspecified time before now — the exact time isn't important",
      'A past action whose result matters right now',
      'Life experiences up to now',
      'Something that started in the past and is still true (often with "for"/"since")',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + have/has + past participle' },
      { label: 'Negative', pattern: 'Subject + have/has + not + past participle' },
      { label: 'Question', pattern: 'Have/Has + subject + past participle?' },
    ],
    positiveExamples: [
      {
        romanUrdu: 'Maine woh movie dekhi hai.',
        english: 'I have seen that movie.',
        note: "Exact time not important — just that you've seen it",
      },
      {
        romanUrdu: 'Woh already office pahunch chuka hai.',
        english: 'He has already reached the office.',
        note: 'Result matters right now — he is there',
      },
      {
        romanUrdu: 'Hum kabhi Dubai nahi gaye.',
        english: 'We have never been to Dubai.',
        note: 'Life experience up to now',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Maine abhi tak lunch nahi kiya.', english: "I haven't had lunch yet." },
      { romanUrdu: 'Usne yeh kaam complete nahi kiya hai.', english: "He hasn't completed this work." },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tumne kabhi Dubai dekha hai?', english: 'Have you ever been to Dubai?' },
      { romanUrdu: 'Kya usne apna kaam khatam kar liya hai?', english: 'Has he finished his work?' },
    ],
    commonMistakes: [
      {
        wrong: 'I have went there.',
        correct: 'I have gone there.',
        explanation:
          'Use the past participle ("gone"), not the simple past form ("went"), after have/has.',
      },
      {
        wrong: 'I have seen him yesterday.',
        correct: 'I saw him yesterday.',
        explanation:
          'With a specific past time word like "yesterday", use Past Simple, not Present Perfect.',
      },
      {
        wrong: 'She has go to the market.',
        correct: 'She has gone to the market.',
        explanation: 'The past participle of "go" is "gone", not "go".',
      },
    ],
    comparison: {
      title: 'Past Simple vs Present Perfect',
      firstExample: {
        label: 'Past Simple',
        romanUrdu: 'Maine woh movie kal dekhi.',
        english: 'I watched that movie yesterday.',
      },
      secondExample: {
        label: 'Present Perfect',
        romanUrdu: 'Maine woh movie dekhi hai.',
        english: 'I have watched that movie.',
      },
      explanation:
        'Past Simple names a finished, specific time (yesterday). Present Perfect leaves the time open — it just matters that it happened before now.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['I have went to the market.', 'I have gone to the market.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt:
      'Tell me one thing you have already done today, and one place you have never visited.',
  },
  {
    id: '7',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Present Perfect Continuous',
    moduleId: 'present-perfect-continuous',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Present Perfect Continuous',
    difficulty: 4,
    romanUrdu: 'Main do ghante se padh raha hoon.',
    english: 'I have been studying for two hours.',
    naturalEnglish: 'I have been studying for two hours.',
    grammarPoint: 'Present Perfect Continuous',
    explanation:
      'Present Perfect Continuous emphasizes an activity that has been continuing over a period of time up to now, or has just recently stopped but still affects the present.',
    uses: [
      'An activity that started in the past and is still continuing now',
      'Emphasizing HOW LONG something has been happening',
      'An activity that recently stopped, but its effect is still visible now',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + have/has + been + verb-ing' },
      { label: 'Negative', pattern: 'Subject + have/has + not + been + verb-ing' },
      { label: 'Question', pattern: 'Have/Has + subject + been + verb-ing?' },
    ],
    positiveExamples: [
      {
        romanUrdu: 'Main do ghante se padh raha hoon.',
        english: 'I have been studying for two hours.',
        note: 'Still continuing, emphasis on duration',
      },
      { romanUrdu: 'Woh subah se kaam kar raha hai.', english: 'He has been working since morning.' },
      {
        romanUrdu: 'Mereku dekho, main daud kar aaya hoon.',
        english: "Look at me — I've been running.",
        note: 'Just stopped, but the effect (out of breath) is visible now',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Main der se coffee nahi pi raha.', english: "I haven't been drinking coffee lately." },
      {
        romanUrdu: 'Woh aaj subah se study nahi kar rahi.',
        english: "She hasn't been studying since this morning.",
      },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tum kaafi der se wait kar rahe ho?', english: 'Have you been waiting for long?' },
      {
        romanUrdu: 'Kya woh yahan kaafi arse se kaam kar raha hai?',
        english: 'Has he been working here for a while?',
      },
    ],
    commonMistakes: [
      {
        wrong: 'I am studying since two hours.',
        correct: 'I have been studying for two hours.',
        explanation:
          'Use Present Perfect Continuous (have been + verb-ing), not Present Continuous, when talking about duration up to now.',
      },
      {
        wrong: 'I have been knowing her for years.',
        correct: 'I have known her for years.',
        explanation: '"Know" is a state verb — use Present Perfect, not the continuous form.',
      },
      {
        wrong: 'She has been study all day.',
        correct: 'She has been studying all day.',
        explanation: 'Don\'t forget -ing on the verb after "has been".',
      },
    ],
    comparison: {
      title: 'Present Perfect vs Present Perfect Continuous',
      firstExample: {
        label: 'Present Perfect',
        romanUrdu: 'Maine teen chapters padh liye hain.',
        english: 'I have read three chapters.',
      },
      secondExample: {
        label: 'Present Perfect Continuous',
        romanUrdu: 'Main do ghante se padh raha hoon.',
        english: 'I have been reading for two hours.',
      },
      explanation:
        'Present Perfect focuses on the result or how much (three chapters). Present Perfect Continuous focuses on the duration of the activity itself (two hours).',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['I am studying since two hours.', 'I have been studying for two hours.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me something you have been doing for a while today — and for how long.',
  },
  {
    id: '8',
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
    explanation:
      'Past Simple describes actions that started and finished at a specific time in the past. The action is completely over.',
    uses: [
      'A completed action at a specific past time',
      'A sequence of completed past actions',
      'Past habits or repeated actions that no longer happen',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + past form of verb' },
      { label: 'Negative', pattern: "Subject + didn't + base verb" },
      { label: 'Question', pattern: 'Did + subject + base verb?' },
    ],
    positiveExamples: [
      { romanUrdu: 'Humne pichle hafte movie dekhi.', english: 'We watched a movie last week.' },
      {
        romanUrdu: 'Woh school gaya tha.',
        english: 'He went to school.',
        note: '"went" — irregular past form of "go"',
      },
      { romanUrdu: 'Maine subah jaldi nashta kiya.', english: 'I had breakfast early this morning.' },
    ],
    negativeExamples: [
      { romanUrdu: 'Maine kal office nahi gaya.', english: "I didn't go to the office yesterday." },
      { romanUrdu: 'Usne phone nahi uthaya.', english: "He didn't answer the phone." },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tumne kal usse baat ki?', english: 'Did you talk to him yesterday?' },
      { romanUrdu: 'Kya woh party mein aayi thi?', english: 'Did she come to the party?' },
    ],
    commonMistakes: [
      {
        wrong: "He don't go to office.",
        correct: "He didn't go to the office.",
        explanation: 'For past negatives, use "didn\'t" for all subjects — not "don\'t".',
      },
      {
        wrong: "I didn't went there.",
        correct: "I didn't go there.",
        explanation: 'After "didn\'t", use the base verb ("go"), not the past form ("went").',
      },
      {
        wrong: 'Did you went to the market?',
        correct: 'Did you go to the market?',
        explanation: 'After "Did", use the base verb, not the past form.',
      },
    ],
    comparison: {
      title: 'Past Simple vs Past Continuous',
      firstExample: {
        label: 'Past Simple',
        romanUrdu: 'Maine phone dekha.',
        english: 'I looked at my phone.',
      },
      secondExample: {
        label: 'Past Continuous',
        romanUrdu: 'Main phone dekh raha tha.',
        english: 'I was looking at my phone.',
      },
      explanation:
        'Past Simple is a short, completed action. Past Continuous describes an action already in progress at a certain past moment.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ["I didn't went to the market.", "I didn't go to the market."],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me three things you did yesterday.',
  },
  {
    id: '9',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Past Continuous',
    moduleId: 'past-continuous',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Past Continuous',
    difficulty: 3,
    romanUrdu: 'Jab tum aaye, main khana bana raha tha.',
    english: 'I was cooking when you arrived.',
    naturalEnglish: 'I was cooking when you arrived.',
    grammarPoint: 'Past Continuous',
    explanation:
      'Past Continuous describes an action that was already in progress at a specific moment in the past — often interrupted by another action, or happening alongside another.',
    uses: [
      'An action in progress at a specific past moment',
      'An ongoing past action interrupted by a shorter action',
      'Two actions happening at the same time in the past',
      'Setting the scene or background for a story',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + was/were + verb-ing' },
      { label: 'Negative', pattern: 'Subject + was/were + not + verb-ing' },
      { label: 'Question', pattern: 'Was/Were + subject + verb-ing?' },
    ],
    positiveExamples: [
      { romanUrdu: 'Jab tum aaye, main khana bana raha tha.', english: 'I was cooking when you arrived.' },
      {
        romanUrdu: 'Woh raat 9 baje TV dekh rahi thi.',
        english: 'She was watching TV at 9pm last night.',
      },
      {
        romanUrdu: 'Hum log baat kar rahe the jab bijli chali gayi.',
        english: 'We were talking when the power went out.',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Main us waqt kaam nahi kar raha tha.', english: "I wasn't working at that time." },
      { romanUrdu: 'Woh log so nahi rahe the.', english: "They weren't sleeping." },
    ],
    questionExamples: [
      { romanUrdu: 'Tum kya kar rahe the jab maine call kiya?', english: 'What were you doing when I called?' },
      { romanUrdu: 'Kya woh party mein dance kar rahi thi?', english: 'Was she dancing at the party?' },
    ],
    commonMistakes: [
      {
        wrong: 'When I reached, he was leave.',
        correct: 'When I reached, he was leaving.',
        explanation: 'Use verb-ing after was/were, not the base verb.',
      },
      {
        wrong: 'I was know the answer.',
        correct: 'I knew the answer.',
        explanation: '"Know" is a state verb — it\'s not usually used in continuous form.',
      },
      {
        wrong: 'While I cooked, she was call me.',
        correct: 'While I was cooking, she called me.',
        explanation:
          'The longer background action takes Past Continuous; the shorter interrupting action takes Past Simple.',
      },
    ],
    comparison: {
      title: 'Past Simple vs Past Continuous',
      firstExample: {
        label: 'Past Simple',
        romanUrdu: 'Bijli chali gayi.',
        english: 'The power went out.',
      },
      secondExample: {
        label: 'Past Continuous',
        romanUrdu: 'Hum baat kar rahe the.',
        english: 'We were talking.',
      },
      explanation:
        'Together: "We were talking when the power went out." The continuous action (talking) was already happening; the simple action (power going out) interrupted it.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['When I reached, he was leave.', 'When I reached, he was leaving.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me what you were doing yesterday at 8pm.',
  },
  {
    id: '10',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Past Perfect',
    moduleId: 'past-perfect',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Past Perfect',
    difficulty: 4,
    romanUrdu: 'Jab main pahuncha, woh already ja chuka tha.',
    english: 'When I arrived, he had already left.',
    naturalEnglish: 'When I arrived, he had already left.',
    grammarPoint: 'Past Perfect',
    explanation:
      'Past Perfect shows that one past action happened before another past action. It puts one event further back in the past than the other — the "past of the past".',
    uses: [
      'An action that happened before another past action',
      'Explaining the earlier of two past events',
      'The "past of the past"',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + had + past participle' },
      { label: 'Negative', pattern: 'Subject + had + not + past participle' },
      { label: 'Question', pattern: 'Had + subject + past participle?' },
    ],
    positiveExamples: [
      {
        romanUrdu: 'Jab main pahuncha, woh already ja chuka tha.',
        english: 'When I arrived, he had already left.',
        note: 'Leaving happened before arriving',
      },
      {
        romanUrdu: 'Meeting start hone se pehle maine report bhej di thi.',
        english: 'I had sent the report before the meeting started.',
      },
      {
        romanUrdu: 'Khana khane se pehle hum ghar pahunch chuke the.',
        english: 'We had reached home before we had dinner.',
      },
    ],
    negativeExamples: [
      {
        romanUrdu: 'Jab woh aaya, maine abhi tak khaana nahi banaya tha.',
        english: "When he arrived, I hadn't cooked yet.",
      },
      { romanUrdu: 'Usne wo movie pehle nahi dekhi thi.', english: "He hadn't seen that movie before." },
    ],
    questionExamples: [
      {
        romanUrdu: 'Kya tumne meeting se pehle report bhej di thi?',
        english: 'Had you sent the report before the meeting?',
      },
      { romanUrdu: 'Kya woh hum se pehle waha pahunch chuki thi?', english: 'Had she reached there before us?' },
    ],
    commonMistakes: [
      {
        wrong: 'When I reached, he already left.',
        correct: 'When I reached, he had already left.',
        explanation:
          'To show one past action happened before another, use "had" + past participle for the earlier one.',
      },
      {
        wrong: 'I had saw him before.',
        correct: 'I had seen him before.',
        explanation: 'Use the past participle ("seen"), not the simple past form ("saw"), after "had".',
      },
      {
        wrong: 'She had went home before we called.',
        correct: 'She had gone home before we called.',
        explanation: 'The past participle of "go" is "gone".',
      },
    ],
    comparison: {
      title: 'Past Simple vs Past Perfect',
      firstExample: {
        label: 'Past Simple',
        romanUrdu: 'Main pahuncha.',
        english: 'I arrived.',
      },
      secondExample: {
        label: 'Past Perfect',
        romanUrdu: 'Woh ja chuka tha.',
        english: 'He had left.',
      },
      explanation:
        'Together: "When I arrived, he had already left." Past Perfect (had left) marks the event that happened first, before the Past Simple event (arrived).',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['When I reached, he already left.', 'When I reached, he had already left.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me about something that had already happened before you left home this morning.',
  },
  {
    id: '11',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Past Perfect Continuous',
    moduleId: 'past-perfect-continuous',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Past Perfect Continuous',
    difficulty: 5,
    romanUrdu: 'Jab bus aayi, main do ghante se wait kar raha tha.',
    english: 'I had been waiting for two hours when the bus arrived.',
    naturalEnglish: 'I had been waiting for two hours when the bus arrived.',
    grammarPoint: 'Past Perfect Continuous',
    explanation:
      'Past Perfect Continuous emphasizes how long an activity had been continuing before a certain point in the past, or an activity that had been happening and had just stopped right before another past event.',
    uses: [
      'An activity that had been continuing for a period of time before another past action',
      'Emphasizing the duration of a past activity, up to a past point',
      'Explaining the cause of a past situation (an activity that had just stopped)',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + had + been + verb-ing' },
      { label: 'Negative', pattern: 'Subject + had + not + been + verb-ing' },
      { label: 'Question', pattern: 'Had + subject + been + verb-ing?' },
    ],
    positiveExamples: [
      {
        romanUrdu: 'Jab bus aayi, main do ghante se wait kar raha tha.',
        english: 'I had been waiting for two hours when the bus arrived.',
      },
      {
        romanUrdu: 'Woh thak gaya tha kyunki woh puri raat kaam kar raha tha.',
        english: 'He was tired because he had been working all night.',
        note: 'The activity had just stopped, but the effect (tired) remained',
      },
      {
        romanUrdu: 'Hum ek ghante se baat kar rahe the jab woh pahuncha.',
        english: 'We had been talking for an hour when he arrived.',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Woh kaafi der se practice nahi kar raha tha.', english: "He hadn't been practicing for long." },
      { romanUrdu: 'Main usse pehle se contact mein nahi tha.', english: "I hadn't been in touch with him before that." },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tum kaafi der se wait kar rahe the?', english: 'Had you been waiting for long?' },
      { romanUrdu: 'Kya woh subah se padh rahi thi?', english: 'Had she been studying since morning?' },
    ],
    commonMistakes: [
      {
        wrong: 'I was waiting since two hours when the bus came.',
        correct: 'I had been waiting for two hours when the bus came.',
        explanation:
          'Use Past Perfect Continuous (had been + verb-ing) for a duration already going on before another past event.',
      },
      {
        wrong: 'He had been know her for years before they met again.',
        correct: 'He had known her for years before they met again.',
        explanation: '"Know" is a state verb — use Past Perfect, not the continuous form.',
      },
      {
        wrong: 'She had been study all morning.',
        correct: 'She had been studying all morning.',
        explanation: 'Don\'t forget -ing on the verb after "had been".',
      },
    ],
    comparison: {
      title: 'Past Perfect vs Past Perfect Continuous',
      firstExample: {
        label: 'Past Perfect',
        romanUrdu: 'Maine teen chapters padh liye the.',
        english: 'I had read three chapters.',
      },
      secondExample: {
        label: 'Past Perfect Continuous',
        romanUrdu: 'Main do ghante se padh raha tha.',
        english: 'I had been reading for two hours.',
      },
      explanation:
        'Past Perfect focuses on the completed result (three chapters) before another past event. Past Perfect Continuous focuses on the duration of the activity itself (two hours).',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['I was waiting since two hours when the bus came.', 'I had been waiting for two hours when the bus came.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me about something you had been doing for a while before something else happened.',
  },
  {
    id: '12',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Future Simple',
    moduleId: 'future-simple',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Future Simple',
    difficulty: 2,
    romanUrdu: 'Main kal office jaunga.',
    english: 'I will go to the office tomorrow.',
    naturalEnglish: 'I will go to the office tomorrow.',
    grammarPoint: 'Future Simple',
    explanation:
      'Future Simple talks about future facts, predictions, spontaneous decisions made right now, and promises — using "will".',
    uses: [
      'Predictions about the future',
      'Spontaneous decisions made at the moment of speaking',
      'Promises and offers',
      'Facts about the future',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + will + base verb' },
      { label: 'Negative', pattern: "Subject + will not (won't) + base verb" },
      { label: 'Question', pattern: 'Will + subject + base verb?' },
    ],
    positiveExamples: [
      { romanUrdu: 'Main kal office jaunga.', english: 'I will go to the office tomorrow.' },
      {
        romanUrdu: 'Lagta hai kal baarish hogi.',
        english: 'I think it will rain tomorrow.',
        note: 'A prediction',
      },
      {
        romanUrdu: 'Theek hai, main tumhe call karunga.',
        english: "Okay, I'll call you.",
        note: 'A decision made right now',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Main aaj late nahi aunga.', english: "I won't be late today." },
      { romanUrdu: 'Woh party mein nahi aayega.', english: "He won't come to the party." },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tum kal free hoge?', english: 'Will you be free tomorrow?' },
      { romanUrdu: 'Kya woh humein madad karega?', english: 'Will he help us?' },
    ],
    commonMistakes: [
      {
        wrong: 'I will going to the market.',
        correct: 'I will go to the market.',
        explanation: 'After "will", use the base verb, not verb-ing.',
      },
      {
        wrong: 'She will goes tomorrow.',
        correct: 'She will go tomorrow.',
        explanation: 'After "will", never add -s to the verb, even for he/she/it.',
      },
      {
        wrong: 'Will you came to the party?',
        correct: 'Will you come to the party?',
        explanation: 'After "Will", use the base verb, not the past form.',
      },
    ],
    comparison: {
      title: 'Will vs Going To',
      firstExample: {
        label: 'Will',
        romanUrdu: 'Main tumhe help karunga.',
        english: 'I will help you.',
      },
      secondExample: {
        label: 'Going To',
        romanUrdu: 'Main kal usse milne wala hoon.',
        english: 'I am going to meet him tomorrow.',
      },
      explanation:
        '"Will" is for spontaneous decisions and predictions made on the spot. "Going to" is for plans you already decided on before speaking.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['She will goes tomorrow.', 'She will go tomorrow.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me one thing you will do tomorrow, and one prediction about next week.',
  },
  {
    id: '13',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Future Continuous',
    moduleId: 'future-continuous',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Future Continuous',
    difficulty: 3,
    romanUrdu: 'Kal is waqt main flight mein hounga.',
    english: 'I will be flying at this time tomorrow.',
    naturalEnglish: 'I will be flying at this time tomorrow.',
    grammarPoint: 'Future Continuous',
    explanation:
      'Future Continuous describes an action that will be in progress at a specific time in the future.',
    uses: [
      'An action in progress at a specific future time',
      'Something that will already be happening when another future event occurs',
      "Polite questions about someone's plans",
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + will be + verb-ing' },
      { label: 'Negative', pattern: "Subject + will not (won't) be + verb-ing" },
      { label: 'Question', pattern: 'Will + subject + be + verb-ing?' },
    ],
    positiveExamples: [
      { romanUrdu: 'Kal is waqt main flight mein hounga.', english: 'I will be flying at this time tomorrow.' },
      {
        romanUrdu: 'Jab tum pahunchoge, hum khana kha rahe honge.',
        english: 'We will be having dinner when you arrive.',
      },
      {
        romanUrdu: 'Is waqt kal, woh exam de rahi hogi.',
        english: 'She will be taking her exam at this time tomorrow.',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Main shaam ko kaam nahi kar raha hounga.', english: "I won't be working in the evening." },
      { romanUrdu: 'Hum us waqt available nahi honge.', english: "We won't be available at that time." },
    ],
    questionExamples: [
      { romanUrdu: 'Kya tum kal is waqt free honge?', english: 'Will you be free at this time tomorrow?' },
      { romanUrdu: 'Kya woh meeting mein hoga?', english: 'Will he be attending the meeting?' },
    ],
    commonMistakes: [
      {
        wrong: 'I will working tomorrow at 5.',
        correct: 'I will be working tomorrow at 5.',
        explanation: 'Don\'t forget "be" before verb-ing.',
      },
      {
        wrong: 'She will be goes to the party.',
        correct: 'She will be going to the party.',
        explanation: 'Use verb-ing after "will be", not the base or -s form.',
      },
    ],
    comparison: {
      title: 'Future Simple vs Future Continuous',
      firstExample: {
        label: 'Future Simple',
        romanUrdu: 'Main kal call karunga.',
        english: 'I will call tomorrow.',
      },
      secondExample: {
        label: 'Future Continuous',
        romanUrdu: 'Kal 5 baje main kaam kar raha hounga.',
        english: 'I will be working at 5 tomorrow.',
      },
      explanation:
        'Future Simple states a future fact or decision. Future Continuous shows an action already in progress at a specific future time.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['I will working tomorrow at 5.', 'I will be working tomorrow at 5.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me what you will be doing this time tomorrow.',
  },
  {
    id: '14',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Future Perfect',
    moduleId: 'future-perfect',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Future Perfect',
    difficulty: 4,
    romanUrdu: 'Agle mahine tak, main yeh course complete kar chuka hounga.',
    english: 'By next month, I will have completed this course.',
    naturalEnglish: 'By next month, I will have completed this course.',
    grammarPoint: 'Future Perfect',
    explanation:
      'Future Perfect shows that an action will be completed before a specific point in the future.',
    uses: [
      'An action that will be finished before a stated future time',
      'Looking back from a future point at something already completed by then',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + will have + past participle' },
      { label: 'Negative', pattern: 'Subject + will not have + past participle' },
      { label: 'Question', pattern: 'Will + subject + have + past participle?' },
    ],
    positiveExamples: [
      {
        romanUrdu: 'Agle mahine tak, main yeh course complete kar chuka hounga.',
        english: 'By next month, I will have completed this course.',
      },
      {
        romanUrdu: '8 baje tak, woh apna kaam khatam kar chuki hogi.',
        english: "By 8 o'clock, she will have finished her work.",
      },
      {
        romanUrdu: 'Jab tum pahunchoge, hum khana bana chuke honge.',
        english: 'We will have cooked dinner by the time you arrive.',
      },
    ],
    negativeExamples: [
      { romanUrdu: 'Shaam tak, main yeh kaam khatam nahi kar paunga.', english: "I won't have finished this work by evening." },
      { romanUrdu: 'Agle hafte tak, woh wapas nahi aaya hoga.', english: "He won't have returned by next week." },
    ],
    questionExamples: [
      {
        romanUrdu: 'Kya tum shaam tak yeh kaam khatam kar chuke hoge?',
        english: 'Will you have finished this work by evening?',
      },
      {
        romanUrdu: 'Kya woh 5 saal tak yahan kaam kar chuki hogi?',
        english: 'Will she have worked here for 5 years by then?',
      },
    ],
    commonMistakes: [
      {
        wrong: 'By next month, I will finish the course.',
        correct: 'By next month, I will have finished the course.',
        explanation:
          'To show completion before a future point, use "will have" + past participle — plain "will" alone doesn\'t show it will be finished by then.',
      },
      {
        wrong: 'She will have finish her work by 8.',
        correct: 'She will have finished her work by 8.',
        explanation: 'Use the past participle ("finished") after "will have", not the base verb.',
      },
    ],
    comparison: {
      title: 'Future Simple vs Future Perfect',
      firstExample: {
        label: 'Future Simple',
        romanUrdu: 'Main kaam khatam karunga.',
        english: 'I will finish the work.',
      },
      secondExample: {
        label: 'Future Perfect',
        romanUrdu: 'Shaam tak, main kaam khatam kar chuka hounga.',
        english: 'By evening, I will have finished the work.',
      },
      explanation:
        'Future Simple just states it will happen. Future Perfect adds a deadline — it will be DONE by that specific future point.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: ['By next month, I will finish the course.', 'By next month, I will have finished the course.'],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me one thing you will have completed by the end of this year.',
  },
  {
    id: '15',
    level: 'Tenses',
    levelNumber: 3,
    module: 'Future Perfect Continuous',
    moduleId: 'future-perfect-continuous',
    lessonNumber: 1,
    category: 'Tenses',
    topic: 'Future Perfect Continuous',
    difficulty: 5,
    romanUrdu: 'Agle mahine tak, main is company mein 5 saal se kaam kar raha hounga.',
    english: 'By next month, I will have been working at this company for 5 years.',
    naturalEnglish: 'By next month, I will have been working at this company for 5 years.',
    grammarPoint: 'Future Perfect Continuous',
    explanation:
      'Future Perfect Continuous emphasizes the duration of an activity that will still be continuing up to a specific point in the future.',
    uses: [
      'Emphasizing how long an activity will have been going on by a future point',
      'An ongoing activity that continues right up to a stated future time',
    ],
    structures: [
      { label: 'Positive', pattern: 'Subject + will have been + verb-ing' },
      { label: 'Negative', pattern: 'Subject + will not have been + verb-ing' },
      { label: 'Question', pattern: 'Will + subject + have been + verb-ing?' },
    ],
    positiveExamples: [
      {
        romanUrdu: 'Agle mahine tak, main is company mein 5 saal se kaam kar raha hounga.',
        english: 'By next month, I will have been working at this company for 5 years.',
      },
      {
        romanUrdu: '10 baje tak, hum 3 ghante se drive kar rahe honge.',
        english: "By 10 o'clock, we will have been driving for 3 hours.",
      },
      {
        romanUrdu: 'Jab tum aaoge, main poori subah se padh raha hounga.',
        english: 'By the time you come, I will have been studying all morning.',
      },
    ],
    negativeExamples: [
      {
        romanUrdu: 'Agle hafte tak, hum yahan zyada der se nahi reh rahe honge.',
        english: "By next week, we won't have been living here for long.",
      },
      {
        romanUrdu: 'Shaam tak, woh kaafi der se wait nahi kar rahi hogi.',
        english: "By evening, she won't have been waiting for long.",
      },
    ],
    questionExamples: [
      {
        romanUrdu: 'Kya agle saal tak, tum yahan 10 saal se kaam kar rahe hoge?',
        english: 'Will you have been working here for 10 years by next year?',
      },
      {
        romanUrdu: 'Kya shaam tak woh kaafi der se practice kar rahi hogi?',
        english: 'Will she have been practicing for long by evening?',
      },
    ],
    commonMistakes: [
      {
        wrong: 'By next month, I will be working here for 5 years.',
        correct: 'By next month, I will have been working here for 5 years.',
        explanation:
          'To emphasize duration up to a future point, use "will have been" + verb-ing, not just "will be".',
      },
      {
        wrong: 'We will have been drive for 3 hours.',
        correct: 'We will have been driving for 3 hours.',
        explanation: 'Use verb-ing after "will have been", not the base verb.',
      },
    ],
    comparison: {
      title: 'Future Perfect vs Future Perfect Continuous',
      firstExample: {
        label: 'Future Perfect',
        romanUrdu: 'Main yeh report likh chuka hounga.',
        english: 'I will have written this report.',
      },
      secondExample: {
        label: 'Future Perfect Continuous',
        romanUrdu: 'Main 3 ghante se likh raha hounga.',
        english: 'I will have been writing for 3 hours.',
      },
      explanation:
        'Future Perfect focuses on the completed result by a future point. Future Perfect Continuous focuses on the ongoing duration of the activity up to that point.',
    },
    practiceQuestions: [
      {
        prompt: 'Choose the correct sentence',
        options: [
          'By next month, I will be working here for 5 years.',
          'By next month, I will have been working here for 5 years.',
        ],
        correctIndex: 1,
      },
    ],
    speakingPrompt: 'Tell me something that, by this time next year, you will have been doing for a long time.',
  },

  // ================== END TENSES MODULE ==================

  {
    id: '16',
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
    id: '17',
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
    id: '18',
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
