export interface User {
  _id: string;
  email: string;
  role: "user" | "admin";
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}