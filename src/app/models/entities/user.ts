import { Entity } from 'src/app/models/entities/entity';

export class User extends Entity {

    private _username: string;
    private _role: string;

    get username(): string{
        return this._username;
    }

    get role(): string{
        return this._role;
    }

    constructor(id: string, username: string, role: string) {
        super(id);
        this._username = username;
        this._role = role;
    }

}