import { Link, useLocation } from "react-router-dom";
import Content from "../components/tamplates/content";
import Button from "../components/ui/button";

const HasilQuiz = () => {
  const { state } = useLocation();

  const title = state?.title || "Quiz Results";
  const score = state?.score ?? 0;
  const total = state?.total ?? 0;
  const wrong = total - score;

  if (total === 0) {
    return <p>No quiz data found.</p>;
  }

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between text-white capitalize">
          <h1 className="text-[22px] font-semibold">{title}</h1>
          <div className="flex items-center">
            <img src="/assets/svgs/star.svg" alt="star-icon" />
            <span>4.8</span>
          </div>
        </div>
      </div>

      <Content>
        <div className="flex flex-col gap-4 text-black">
          <p>Correct: {score}</p>
          <p>Wrong: {wrong}</p>
          <p>Total: {total}</p>
        </div>

        <Link to={"/"}>
          <Button className="bg-gradient-primary w-full">Back</Button>
        </Link>
      </Content>
    </>
  );
};

export default HasilQuiz;
