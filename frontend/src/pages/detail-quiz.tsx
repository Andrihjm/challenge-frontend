import { BookText, Clock, Star } from "lucide-react";
import BackPage from "../components/shared/back-page";
import Content from "../components/tamplates/content";
import Button from "../components/ui/button";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DetailQuiz = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const { quiz, questions } = location.state || {};

  return (
    <>
      <div className="flex items-center gap-4 p-4">
        <BackPage />
        Detail Quiz
      </div>

      <div>
        <div className="p-4">
          <div className="flex items-center justify-between text-white capitalize">
            <h1 className="text-[22px] font-semibold">{quiz.category}</h1>
            <div className="flex items-center">
              <img src="/assets/svgs/star.svg" alt="star-icon" />
              <span>4.8</span>
            </div>
          </div>
          <p className="text-sm font-extralight">GET 100 Points</p>
        </div>

        <Content>
          <div className="text-[#333333]">
            <h1 className="font-semibold">Brief explanation about this quiz</h1>

            <div className="flex flex-col gap-4 px-2 py-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <BookText size={24} />
                </div>

                <div className="flex flex-col">
                  10 Questions
                  <span className="text-sm font-light text-[#999999]">
                    10 point for a correct answer
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <Clock size={24} />
                </div>

                <div className="flex flex-col">
                  1 hour 15 min
                  <span className="text-sm font-light text-[#999999]">
                    Total duration of the quiz
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-gradient-primary flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <Star size={24} />
                </div>

                <div className="flex flex-col">
                  Win 10 star
                  <span className="text-sm font-light text-[#999999]">
                    Answer all questions correctly
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-[53%] flex-col text-[#333333]">
            <h1 className="font-semibold">
              Please read the text below carefully so you can understand it
            </h1>

            <div className="flex flex-col gap-4 px-2 py-4">
              <div className="flex w-full items-start gap-2 font-extralight text-[#333333]">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                <p>
                  10 point awarded for a correct answer and no marks for a
                  incorrect answer
                </p>
              </div>
              <div className="flex w-full items-start gap-2 font-extralight text-[#333333]">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                <p>Tap on options to select the correct answer</p>
              </div>
              <div className="flex w-full items-start gap-2 font-extralight text-[#333333]">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                <p>Tap on the bookmark icon to save interesting questions</p>
              </div>
              <div className="flex w-full items-start gap-2 font-extralight text-[#333333]">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-black" />
                <p>
                  Click submit if you are sure you want to complete all the
                  quizzes lorem1000
                </p>
              </div>
            </div>

            <Button
              onClick={() =>
                navigate(`/detail-quiz/${params.id}/quiz-play`, {
                  state: questions,
                })
              }
              className="bg-gradient-primary mt-auto w-full rounded-md py-3 text-white"
            >
              Start Quiz
            </Button>
          </div>
        </Content>
      </div>
    </>
  );
};

export default DetailQuiz;
