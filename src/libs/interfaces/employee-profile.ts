export interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  manager: string;
  birthday: string;
  join_date: string;
  review: Review;
}

interface Review {
  id: string;
  content: string;
  created_at: string;
}
