import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { appConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        let URI = `${appConfig.apiUrl}/users/authenticate`;
        let headers = new Headers;
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, {email : email, password: password})
             .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          return true
        } else {
          return false;
        }
    }

    isAdmin() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            const currentUser = JSON.parse(user._body);
            if(currentUser.role == 'admin'){
                return true;
            }else{
                return false;
            }
        } else {
          return false;
        }
    }

    currentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}