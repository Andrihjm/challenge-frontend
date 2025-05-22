import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface QuizTimerProps {
  onTimeUp: () => void;
}

const QuizTimer = ({ onTimeUp }: QuizTimerProps) => {
  const totalTime = dayjs.duration({ hours: 1, minutes: 15 }).asSeconds();
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds: number) => {
    const dur = dayjs.duration(seconds, "seconds");
    const minutes = String(dur.minutes()).padStart(2, "0");
    const hours = String(Math.floor(dur.asHours())).padStart(2, "0");
    const secs = String(dur.seconds()).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  return (
    <div className="flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs font-extralight text-blue-500">
      <Clock size={14} />
      {formatTime(timeLeft)}
    </div>
  );
};

export default QuizTimer;
