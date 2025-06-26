



export interface UserDTO {
  id: number;
export interface IUser {
  id: string;
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  password?: string;
  isAdmin: boolean;
  agencyId?: number | null;
}

export interface CreateUserDTO {
  name: string;
  surname?: string;
  email: string;
  phone?: string;
  password?: string;
  isAdmin: boolean;
  agencyId?: number | null;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}