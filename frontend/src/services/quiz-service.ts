import { OPENDB_URL } from "../redux/constants";

export const fetchQuizByCategory = async () => {
  try {
    const response = await fetch(
      `${OPENDB_URL}?amount=10&difficulty=easy&type=multiple`,
    );

    const data = await response.json();
    if (data.response_code !== 0) {
      throw new Error("Failed to fetch quiz data");
    }

    return data.results;
  } catch (error) {
    console.log(error);
  }
};
