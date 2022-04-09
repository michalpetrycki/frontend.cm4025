export interface UserResponse{
    _id: string;
    username: string;
    password: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    avatarUrl?: string;
}