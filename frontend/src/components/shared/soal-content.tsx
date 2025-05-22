import { useNavigate } from "react-router-dom";
import { useQuizQuery } from "../../hooks/use-quiz";
import type { QuizItem } from "../../types/index.type";

const SoalContent = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuizQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Failed to load quiz</p>;

  return (
    <div className="mb-52 flex flex-col gap-4 text-[#999999]">
      {data.map((quiz: QuizItem, index: number) => (
        <div
          key={quiz.question}
          onClick={() =>
            navigate(`/detail-quiz/${index}`, {
              state: {
                quiz: quiz,
                questions: data,
              },
            })
          }
          className="flex cursor-pointer gap-3 rounded-md border-2 border-transparent p-4 shadow-md transition-all duration-200 hover:border-blue-500"
        >
          <div className="h-[75px] w-[110px] overflow-hidden">
            <img
              src="/assets/svgs/tec.png"
              alt="album"
              className="h-full w-full overflow-hidden object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-between text-sm font-extralight">
            <div className="text-gradient-primary flex items-center justify-between">
              <h1
                title={quiz.category}
                className="line-clamp-2 text-[18px] font-bold"
              >
                {quiz.category}
              </h1>
              <div className="flex shrink-0 items-center">
                <img src="/assets/svgs/star.svg" alt="star-icon" />
                <span>4.8</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm">
              <img src="/assets/svgs/book.svg" alt="book-icon" />
              <span>10 Question</span>
            </div>

            <div className="flex items-center text-sm">
              <img src="/assets/svgs/time.svg" alt="book-icon" />
              <span>1hour 15min</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SoalContent;
