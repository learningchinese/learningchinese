//Use AppConfig as a service
import { Injectable } from "@angular/core";

@Injectable()
export class AppConfig {
    serverApiUrl: string = "";
    authApiUrl: string = "";
    appId: string = "";
    public permissions = {
        LOGIN: "login"
    }
}