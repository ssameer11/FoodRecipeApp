import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private store: Store<fromAppReducer.AppState>) {};
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean 
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    {
        return this.store.select('auth').pipe(
        map(authState => authState.user),
        take(1),
        map(user => {
            const isAuth = !!user;
            if(isAuth) {
                return true;
            } else {
                return this.router.createUrlTree(['/auth']);
            }
        }))

    }
}