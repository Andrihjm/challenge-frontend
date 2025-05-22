import { useQuery } from "@tanstack/react-query";
import { fetchQuizByCategory } from "../services/quiz-service";

export const useQuizQuery = () => {
  return useQuery({
    queryKey: ["quiz"],
    queryFn: () => fetchQuizByCategory(),
  });
};
