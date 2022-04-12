export interface User {
    _id?: string;
    email: string;
    role: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    propertyToEdit1?: string;
    propertyToEdit2?: string;
    propertyToEdit3?: string;
    propertyToEdit4?: string;
    imageUrl?: '';
}
