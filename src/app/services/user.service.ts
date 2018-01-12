import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';
import { Service } from './service';
import { AppConfig } from '../configs/app.config';

@Injectable()
export class UserService extends Service<User> {
    constructor(http: Http, private appConfig: AppConfig) {
        super(http, appConfig.serverApiUrl + '/api/v1/accounts');
    }

    authenticate(user: User): Promise<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        user.app = this.appConfig.appId;
        return this.http
            .post(this.appConfig.authApiUrl,
            JSON.stringify(user),
            { "headers": headers })
            .toPromise()
            .then(res => JSON.parse(res["_body"]) as Object)
            .catch(this.handleError);
    }

    rejectToken(refreshToken: string): Promise<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.appConfig.authApiUrl + "/token/reject",
            JSON.stringify({ "refreshToken": refreshToken }))
            .toPromise()
            .then(res => JSON.parse(res["_body"]) as Object)
            .catch(this.handleError);
    }

    refreshToken(refreshToken: string): Promise<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.appConfig.authApiUrl + "/token",
            JSON.stringify({ "refreshToken": refreshToken }))
            .toPromise()
            .then(res => JSON.parse(res["_body"]) as Object)
            .catch(this.handleError);
    }

    changePassword(user: User): Promise<Object> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        user.app = this.appConfig.appId;
        return this.http
            .post(this.appConfig.authApiUrl + "/change-password",
            JSON.stringify(user),
            { "headers": headers })
            .toPromise()
            .then(res => JSON.parse(res["_body"]) as Object)
            .catch(this.handleError);
    }
}