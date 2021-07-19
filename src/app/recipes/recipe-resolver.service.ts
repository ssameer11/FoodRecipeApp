import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { exhaustMap, map, switchMap, take, tap } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import * as RecipesActions from "./store/recipes.actions";

@Injectable({ providedIn: 'root'})
export class RecipeResolver implements Resolve<Recipe[]>{
    
    constructor(
        private store: Store<fromApp.AppState>,
        private actions$: Actions) {}
    resolve(route: ActivatedRouteSnapshot , state: RouterStateSnapshot
        ){ 
        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if(recipes.length != 0){
                    return of(recipes);
                }else {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    return this.actions$.pipe(
                        ofType(RecipesActions.SET_RECIPES),
                        take(1)
                    )
                }
            })
        ) 
    }
}