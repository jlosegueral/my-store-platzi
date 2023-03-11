import { User } from "./index.models";

export type CreateUserDTO = Omit<User, 'id' | 'role'>