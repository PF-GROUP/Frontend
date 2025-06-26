



export interface UserDTO {
  id: number;
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