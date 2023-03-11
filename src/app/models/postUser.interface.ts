import { User } from './index.models';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PostUser extends Omit<User, 'id'>{
    
}