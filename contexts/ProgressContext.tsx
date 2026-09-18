import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type ProgressContextValue = {
  streakDays: number;
  lessonsCompleted: number;
  phrasesLearned: number;
  completedLessonIds: string[];
  completeLesson: (lessonId: string) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  const completeLesson = (lessonId: string) => {
    setCompletedLessonIds((current) =>
      current.includes(lessonId) ? current : [...current, lessonId]
    );
  };

  const value = useMemo<ProgressContextValue>(
    () => ({
      streakDays: completedLessonIds.length > 0 ? 1 : 0,
      lessonsCompleted: completedLessonIds.length,
      phrasesLearned: completedLessonIds.length,
      completedLessonIds,
      completeLesson,
    }),
    [completedLessonIds]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
