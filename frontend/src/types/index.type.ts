export type QuizItem = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  category: string;
  difficulty: string;
  type: string;
};

export type HasilQuizType = {
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
};
