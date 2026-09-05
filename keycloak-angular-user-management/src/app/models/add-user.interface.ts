import { Credentials } from "./credentials.interface";

export interface AddUserInterface {
    email: string,
    enabled: boolean, 
    firstName: string,
    lastName: string,
    username: string,
    groups: string[],
    realmRoles: string[],
    requiredActions: string[],
    credentials: Credentials[],
    attributes?: object
}