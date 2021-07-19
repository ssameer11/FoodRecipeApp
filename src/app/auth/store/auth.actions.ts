import { Action } from "@ngrx/store";

export const START_LOGIN = '[Auth] Start Login';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTHENTICATE_SUCCESS = '[ Auth ] Login';
export const LOGOUT = '[ Auth ] Logout';
export const AUTHENTICATE_FAIL = '[ Auth ] Login Failed';
export const SIGNUP_START = '[Auth] SignUp Start';
export const CLEAR_ERRORS = '[Auth] Clear Errors';
  
export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor( public payload: {
        email: string,
        userId: string,
        token: string,
        tokenExpirationDate: Date,
        redirect: boolean
    }){}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class StartLogin implements Action {
    readonly type = START_LOGIN;
    constructor(public payload: {
        email:string,
        password: string
    }) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) {}
}

export class SignUpStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: {
        email: string,
        password: string
    }) {}
}

export class ClearErrors implements Action {
    readonly type = CLEAR_ERRORS;
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}




export type AuthActions = AuthenticateSuccess 
                        | Logout
                        | StartLogin 
                        | AuthenticateFail 
                        | SignUpStart
                        | ClearErrors
                        | AutoLogin;