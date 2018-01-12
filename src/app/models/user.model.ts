import {Entity} from "./entity.model";

export class User extends Entity {
    app: string;
    username: string;
    curPassword: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    roles: string[];
}