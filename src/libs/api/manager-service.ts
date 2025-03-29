import axios from "axios";
import { Manager } from "@/libs/interfaces/manager";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

const getAllManagers = async (): Promise<Manager[] | null> => {
  try {
    const response = await api.get<Manager[]>("managers");
    return response.data;
  } catch {
    return null;
  }
};

export { getAllManagers };
