export interface DirectorResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  schoolUnit: Lookup;
  createdAt: Date;
}

export interface DirectorUpdateRequest {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface Lookup {
  id: string;
  description: string;
}