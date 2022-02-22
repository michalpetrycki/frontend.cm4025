import { Entity } from 'src/app/models/entities/entity';
import { UserResponse } from 'src/app/models/interfaces/user.interface';

export class User extends Entity {

    public username: string;
    public role: string;

    constructor(user: UserResponse) {
        super(user.id);
        this.username = user.username;
        this.role = user.role;
    }

}