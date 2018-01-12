import { Headers, Http, Response } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { Entity } from "../models/entity.model";

export class Service<T extends Entity> {
    protected apiUrl: string;  // URL to web api
    protected http: Http;
    constructor(http: Http, apiUrl) {
        this.http = http;
        this.apiUrl = apiUrl;
    }
    getAll(): Promise<T[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => JSON.parse(response["_body"]) as T[])
            .catch(this.handleError);
    }
    getMany(): Promise<T[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => JSON.parse(response["_body"]) as T[])
            .catch(this.handleError);
    }
    getOne(id: string): Promise<T> {
        return this.http.get(this.apiUrl + id)
            .toPromise()
            .then(response => JSON.parse(response["_body"]) as T)
            .catch(this.handleError);
    }
    save(entity: T): Promise<T> {
        if (entity._id || entity.id) {
            return this.put(entity);
        }
        return this.post(entity);
    }
    delete(entity: T): Promise<Response> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let url = this.apiUrl + "/" + entity._id;
        return this.http
            .delete(url, {})
            .toPromise()
            .catch(this.handleError);
    }
    // Add new entity
    private post(entity: T): Promise<T> {
        let headers = new Headers({ "Content-Type": "application/json" });
        headers.append("XToken", localStorage.getItem("token"));
        return this.http
            .post(this.apiUrl, JSON.stringify(entity), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    // Update existing entity
    private put(entity: T): Promise<T> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("XToken", localStorage.getItem("token"));
        let url = this.apiUrl + (entity._id || entity.id);
        return this.http
            .put(url, JSON.stringify(entity), { headers: headers })
            .toPromise()
            .then(() => entity)
            .catch(this.handleError);
    }
    protected handleError(error: any): Promise<any> {
        console.error("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}