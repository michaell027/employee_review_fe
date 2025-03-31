import axios from "axios";
import { Employee } from "@/libs/interfaces/employee";
import { EmployeeProfile } from "@/libs/interfaces/employee-profile";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

const getManagerEmployees = async (
  managerId: number,
): Promise<Employee[] | null> => {
  try {
    const response = await api.get<Employee[]>(
      `managers/${managerId}/employees`,
    );
    return response.data;
  } catch {
    return null;
  }
};

const getEmployeeById = async (
  employeeId: number,
): Promise<EmployeeProfile | null> => {
  try {
    const response = await api.get<EmployeeProfile>(`employees/${employeeId}`);
    return response.data;
  } catch {
    return null;
  }
};

export { getManagerEmployees, getEmployeeById };
