export type UserRole = 'client' | 'freelancer' | 'public_freelancer' | 'public_client' | 'workstation';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Add other user properties as needed
}
