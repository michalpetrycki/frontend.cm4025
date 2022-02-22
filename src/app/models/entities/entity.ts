export class Entity{
    private _id: string;

    get id(): string{
        return this._id;
    }

    constructor(id: string){
        this._id = id;
    }

}

export enum EntityType{
    user = 'User',
    post = 'Post'
}