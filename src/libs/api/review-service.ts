import axios from "axios";
import { Evaluation } from "@/libs/interfaces/evaluation";
import { Review } from "@/libs/types/review";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

const getReviewBasedOnEvaluation = async (
  evaluation: Evaluation,
): Promise<Review | null> => {
  try {
    const response = await api.post<Review>("/review", evaluation, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch {
    return null;
  }
};

export { getReviewBasedOnEvaluation };
