import { Entity } from 'src/app/models/entities/entity';
import { UserResponse } from 'src/app/models/interfaces/user.response.interface';

export class User extends Entity {

    public username: string;
    public role: string;
    public email: string;
    public createdAt: Date;
    public updatedAt: Date;
    public avatarUrl: string | undefined;

    constructor(userResponse: UserResponse) {
        super(userResponse._id);
        this.username = userResponse.username;
        this.role = userResponse.role;
        this.email = userResponse.email;
        this.createdAt = userResponse.createdAt;
        this.updatedAt = userResponse.updatedAt;
        this.avatarUrl = userResponse.avatarUrl;
    }

}