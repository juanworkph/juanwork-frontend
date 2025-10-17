export type UserRole = 'guest' | 'client' | 'freelancer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string | null;
  balance?: number;
  createdAt?: string;
  updatedAt?: string;
}
