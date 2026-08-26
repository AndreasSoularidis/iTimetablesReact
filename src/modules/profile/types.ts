export interface DirectorResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  schoolUnit: Lookup;
}

export interface Lookup {
  id: string;
  description: string;
}