import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, map, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private store: Store<fromAppReducer.AppState>){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select('auth').pipe(
        map(authState => {
            return authState.user;
        }),
        take(1),
        exhaustMap(user => {
            if(!user) {
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth',user.token)
            })
            return next.handle(modifiedReq)
        }))
    }
    
}