export interface DirectorResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  schoolUnit: Lookup;
}

export interface DirectorUpdateRequest {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface Lookup {
  id: string;
  description: string;
}