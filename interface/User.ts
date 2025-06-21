



export interface UserDTO {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password?: string;
  rol: "admin" | "User";
}

export interface CreateUserDTO {
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  rol: "admin" | "User";
}

export interface LoginUserDTO {
  email: string;
  password: string;
}