import type { ReactNode } from 'react';
export interface QuizQuestion {
  prompt: string;
  options: string[];
  correct: number[];
  explanation: string;
}
export interface CourseLesson {
  id: string;
  title: string;
  lead: string;
  word: string;
  content: ReactNode;
  questions: QuizQuestion[];
}
export interface CourseSource { label: string; url: string }
