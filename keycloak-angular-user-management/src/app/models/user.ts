export class UserKeyCloak {

    constructor(
        public id: string,
        public createdTimestamp: number,
        public username: string,
        public enabled: boolean,
        public totp: boolean,
        public emailVerified: boolean,
        public firstName: string,
        public lastName: string,
        public email: string,
        public disableableCredentialTypes: any[],
        public requiredActions: any[],
        public notBefore: number,
        public access: KeyCloakAccessModel,
        public group?: string
    ) {}    

}

export class KeyCloakAccessModel {

    constructor(
        public manageGroupMembership: boolean,
        public view: boolean,
        public mapRoles: boolean,
        public impersonate: boolean,
        public manage: boolean
    ) {}

}

export class UserKeyCloakGroup {

    constructor(
        public id: string,
        public name: string,
        public path: string,
        public userId?: string,
        public subGroup?: any[]
    ) {}

}