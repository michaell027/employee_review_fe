import axios from "axios";
import { Employee } from "@/libs/interfaces/employee";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

const getAllEmployees = async (): Promise<Employee[] | null> => {
  try {
    const response = await api.get<Employee[]>("/users");
    return response.data;
  } catch {
    return null;
  }
};

const getManagerEmployees = async (
  managerId: number,
): Promise<Employee[] | null> => {
  try {
    const response = await api.get<Employee[]>(
      `/managers/${managerId}/employees`,
    );
    return response.data;
  } catch {
    return null;
  }
};

const getEmployeeById = async (
  employeeId: number,
): Promise<Employee | null> => {
  try {
    const response = await api.get<Employee>(`/employees/${employeeId}`);
    return response.data;
  } catch {
    return null;
  }
};

export { getAllEmployees, getManagerEmployees, getEmployeeById };
