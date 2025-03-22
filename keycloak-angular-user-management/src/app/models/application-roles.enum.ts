export enum ApplicationRoles {
	ADMIN = "ADMIN",
	USER = "USER",
	REGISTERED = "REGISTERED",
	UNKNOWN = "UNKONWN"
}

export const applicationRolesArr: ApplicationRoles[] = [
	ApplicationRoles.ADMIN,
	ApplicationRoles.USER,
	ApplicationRoles.REGISTERED
];

export const applicationRolesTranslations = {
	"ADMIN": "Admin",
	"USER": "User",
	"REGISTERED": "Registered"
};