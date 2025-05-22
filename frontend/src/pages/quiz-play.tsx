import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import BackPage from "../components/shared/back-page";
import QuizTimer from "../components/shared/quiz-timer";
import Content from "../components/tamplates/content";
import Button from "../components/ui/button";
import NotFound from "../components/ui/not-found";

const QuizPlay = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();
  const { state: quizList } = useLocation();

  if (!quizList || !Array.isArray(quizList) || quizList.length === 0) {
    return <NotFound />;
  }

  const currentQuestion = quizList[currentIndex];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const shuffledAnswers = useMemo(() => {
    const answers = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ];
    return [...answers].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }

    setSelectedAnswer(null);

    if (currentIndex + 1 < quizList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/hasil-quiz", {
        state: {
          score:
            score + (selectedAnswer === currentQuestion.correct_answer ? 1 : 0),
          total: quizList.length,
          title: quizList[0].category || "Quiz Results",
        },
      });
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  const handleOnTimeUp = () => {
    navigate("/hasil-quiz", {
      state: {
        score,
        total: quizList.length,
        title: quizList[0].category || "Quiz Results",
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="line-clamp-2 flex items-center gap-4">
          <BackPage />
          {currentQuestion.category}
        </div>
        <QuizTimer onTimeUp={handleOnTimeUp} />
      </div>

      <Content>
        <div className="text-[#333333]">
          <h1
            className="mb-4 line-clamp-2 font-semibold"
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          />

          <div className="flex flex-col gap-2">
            {shuffledAnswers.map((answer, idx) => (
              <div
                key={idx}
                className={`flex cursor-pointer items-center gap-2 rounded-md border p-3 ${
                  selectedAnswer === answer
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
                onClick={() => handleAnswerSelect(answer)}
              >
                <span className="font-semibold">{optionLabels[idx]}.</span>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </div>
            ))}
          </div>

          <Button
            className="bg-gradient-primary mt-6 w-full rounded-md py-3 text-white disabled:opacity-50"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentIndex + 1 === quizList.length
              ? "Finish Quiz"
              : "Next Question"}
          </Button>
        </div>
      </Content>
    </>
  );
};

export default QuizPlay;
