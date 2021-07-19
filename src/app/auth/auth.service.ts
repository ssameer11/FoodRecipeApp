import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    idToken: string;
    email: string;
    expiresIn: string;
    refreshToken: string;
    localId: string;
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    
    // public UserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private tokenExpirationTimeout: any;
    constructor(
        private store: Store<AppState>){}


    setAutoLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.store.dispatch(new AuthActions.Logout())
        },expirationDuration)
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
            this.tokenExpirationTimeout = null;
        }
    }

}