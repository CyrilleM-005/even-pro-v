export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  nom: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  nom: string;
  email: string;
  token: string;
}
