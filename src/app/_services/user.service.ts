import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const currentUser = JSON.parse(user._body);
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-header',currentUser.token)
        let options = new RequestOptions({headers: headers});
        return this.http.get(appConfig.apiUrl + '/users', options).map(this.extractData);
    }

    getById(_id: string) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const currentUser = JSON.parse(user._body);
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-header',currentUser.token)
        let options = new RequestOptions({headers: headers});
        return this.http.get(appConfig.apiUrl + '/users/' + _id, options).map(this.extractData);
    }

    create(user: User) {
        return this.http.post(appConfig.apiUrl + '/users/register', user);
    }

    update(user: User) {
        const user1 = JSON.parse(localStorage.getItem('currentUser'));
        const currentUser = JSON.parse(user1._body);
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        headers.append('x-auth-header',currentUser.token)
        let options = new RequestOptions({headers: headers});
        return this.http.put(appConfig.apiUrl + '/users/' + user._id, user, options).map(this.extractData);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/users/' + _id);
    }
    public extractData(res: Response) {
        let body = res.json();
            return body;
        }
}