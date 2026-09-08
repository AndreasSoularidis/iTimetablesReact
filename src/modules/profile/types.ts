export interface DirectorResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  schoolUnit: Lookup;
}

export interface DirectorUpdateRequest {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface Lookup {
  id: string;
  description: string;
}