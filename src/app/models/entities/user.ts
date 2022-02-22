import { Entity } from 'src/app/models/entities/entity';
import { UserResponse } from 'src/app/models/interfaces/user.interface';

export class User extends Entity {

    public username: string;
    public role: string;
    public email: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(user: UserResponse) {
        super(user._id);
        this.username = user.username;
        this.role = user.role;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }

}