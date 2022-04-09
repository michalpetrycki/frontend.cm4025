export class Entity{
    private _id: string;

    get id(): string{
        return this._id;
    }

    set id(iid: string){
        this._id = iid;
    }

    constructor(id: string){
        this._id = id;
    }

}

export enum EntityType{
    user = 'User',
    post = 'Post'
}