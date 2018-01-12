import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import "rxjs/add/operator/toPromise";

import {UserService} from "./user.service";
import {AppConfig} from "../configs/app.config";

@Injectable()
export class AuthService {

    private auth: Object;
    private permissions : string[];

    constructor(private router: Router, private userService: UserService, private appConfig: AppConfig){
        this.init();
    }

    private init() {
        let p = localStorage.getItem("permission");
        if (p !== null || p === undefined) {
            this.permissions = p.split(",");
        } else {
            this.permissions = [];
        }
        this.permissions.push("login");
    }

    private reset() {
        this.auth = null;
        this.permissions = ["login"];
        localStorage.removeItem("token");
        localStorage.removeItem("permission");
    }

    logout() {
        this.reset();
        return this.userService.rejectToken(this.getRefreshToken());
    }

    login(user): Promise<Object>{
            return this.userService.authenticate(user);
    }

    storeToken(data): boolean {
        this.permissions = data["permissions"];
        localStorage.setItem("permission", this.permissions.toString());
        localStorage.setItem("token", data["token"]);
        localStorage.setItem("refreshToken", data["refreshToken"]);
        return true;
    }

    getToken(): string {
        return localStorage.getItem("token");
    }
    
    getRefreshToken(): string {
        return localStorage.getItem("refreshToken");
    }
    
    checkPermission(permisson: string): boolean {
        var i;
        var n = this.permissions.length;
        for (i = 0; i < n; i++) {
            if(this.permissions[i] === permisson){
                    return true;
            }
        }
        return false;
    }
    
    private parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    
    isAuthenticated() {
        if(this.auth == null) {
            var token = this.getToken();
            if (token) {
                this.auth = this.parseJwt(token);
            }
        }
        return this.auth != null;
    }
    
    isTokenExpired(): boolean {
        if (this.isAuthenticated()) {
            return (this.auth["exp"] - Date.now()) > 3000000;
        }
        return true;
    }
    
    getUsername(): string {
        if (this.isAuthenticated()) {
                return this.auth["username"];
        }
        return null;
    }
    
    refreshToken() {
        if(this.isAuthenticated()) {
            if(this.isTokenExpired()) {
                this.userService.refreshToken(this.getRefreshToken()).then(data => this.storeToken(data));
            }   
        }
    }
    
    checkCredentials(){
        if (localStorage.getItem("token") === null){
            this.router.navigate(["/login"]);
        }
    }
}