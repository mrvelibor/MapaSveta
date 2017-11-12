import {UserRole} from './user-role';

export class User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  userRole: UserRole;
  password: string;
}
