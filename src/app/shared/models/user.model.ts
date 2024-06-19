import { UserType } from '../enums/user-type';

export interface User {
    imageUrl?: string;
    firstName: string;
    lastName: string;
    userType: UserType;
    token: string;
    address?: Address;
    phoneNumber: string;
    email: string;
    dateOfBirth?: string;
    tenantID: string;
    userId: string;
    permissions?: null;
    password?: string;
    exp?: Date;
}

export interface Address {
    addressLine: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}
