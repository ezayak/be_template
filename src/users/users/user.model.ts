export interface User {
  id: string;
  name: string;
  lastname: string;
  role: UserRoles;
}

export enum UserRoles {
  amdin = 'Admin',
  coach = 'Coach',
  referee = 'Referee',
}
