export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  createdAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  dateOfBirth: string;
}