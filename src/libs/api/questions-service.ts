import axios from "axios";
import { Question } from "@/libs/types/question";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

const getQuestionsByEmployeeId = async (
  employeeId: number,
): Promise<Question[] | null> => {
  try {
    const response = await api.get<Question[]>("/questions", {
      params: { employee_id: employeeId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null;
  }
};

export { getQuestionsByEmployeeId };
