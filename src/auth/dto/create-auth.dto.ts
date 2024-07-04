import { Role } from '../entities/auth.entity';

export class CreateAuthDto {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  photoProfile: string;
}
