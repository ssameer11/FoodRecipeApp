import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from "./auth.actions";



export interface AuthResponseData {
    idToken: string;
    email: string;
    expiresIn: string;
    refreshToken: string;
    localId: string;
    registered?: boolean
}


const handleAuthentication = (resData: any) => {
                const tokenExpirationDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
                const user = new User(resData.email,resData.localId,resData.idToken,tokenExpirationDate);
                localStorage.setItem('userData',JSON.stringify(user));
                return new AuthActions.AuthenticateSuccess({
                    email: resData.email,
                    userId: resData.localId,
                    token: resData.idToken,
                    tokenExpirationDate: tokenExpirationDate,
                    redirect: true
                })
}

const handleErrors = (errorResponse: any) => {
    let errorMessage = "Oops Something went wrong!"
        if(!errorResponse.error || !errorResponse.error.error){
            return of(new AuthActions.AuthenticateFail(errorMessage));
        }else {
            switch(errorResponse.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage = 'Email already in Use!'
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = `User with this Email Not Found !
                    Make sure the Email is Correct.`
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "Password doesn't Match"
                    break;
                case 'USER_DISABLED':
                    errorMessage = "User is Disabled!"
                    break;
            }
        }
            return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
export class AuthEffects {

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.START_LOGIN),
        switchMap((authData: AuthActions.StartLogin) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseApiKey,{
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }).pipe(
            tap((loginData) => {
                this.authService.setAutoLogoutTimer(+loginData.expiresIn*1000);
            }),
            map(resData => {
                return handleAuthentication(resData);
            }),
            catchError(errorResponse => {
                return handleErrors(errorResponse);
            })
        )
        })
    )

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            this.router.navigate(['/auth']);
            localStorage.removeItem('userData');
        })
    )

    @Effect()
    authAutoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                userId: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if(!userData){
                return { type: 'DUMMY'};
            }
            const user = new User(userData.email,userData.userId,userData._token,new Date(userData._tokenExpirationDate))
            if(user.token){
                let timeOutDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setAutoLogoutTimer(timeOutDuration);
    
               return (new AuthActions.AuthenticateSuccess({
                    email: user.email,
                    userId: user.userId,
                    token: user.token,
                    tokenExpirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                }))
            }else {
               return  { type: 'DUMMY'}
            }
    
        })
    )

    @Effect()
    authSignUP = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signUpData: AuthActions.SignUpStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseApiKey,{
            email: signUpData.payload.email,
            password: signUpData.payload.password,
            returnSecureToken: true
        }).pipe(
            tap((loginData) => {
                this.authService.setAutoLogoutTimer(+loginData.expiresIn*1000);
            }),
            map(resData => {
                return handleAuthentication(resData);
            }),
            catchError(errorResponse => {
                return handleErrors(errorResponse);
            }))
        })
    )

    @Effect({dispatch: false}) 
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap((resData: AuthActions.AuthenticateSuccess) => {
            if(resData.payload.redirect){
                this.router.navigate(['/'])
            }
        })
    )


    constructor(private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}
}