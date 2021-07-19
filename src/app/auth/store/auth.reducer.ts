import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
    user: User,
    errorMessage: string,
    isLoading: boolean
}

const initialState: State = {
    user: null,
    errorMessage: null,
    isLoading: false
}


export function authReducer( state = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.AUTHENTICATE_SUCCESS:
            const user = new User(action.payload.email,action.payload.userId,action.payload.token,action.payload.tokenExpirationDate);
            return {
                ...state,
                user: user,
                errorMessage: null,
                isLoading: false
            }
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null,
                errorMessage: null,
            }
        case AuthActions.START_LOGIN:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                errorMessage: null,
                isLoading: true
            }    
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false
            }
        case AuthActions.CLEAR_ERRORS:
            return {
                ...state,
                errorMessage: null
            }    
        default:
            return {
                ...state,
                isLoading: false,
                error: null
            }
    }
}