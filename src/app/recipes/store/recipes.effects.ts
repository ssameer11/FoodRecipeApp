import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap, map, withLatestFrom, catchError} from "rxjs/operators";
import * as fromApp from "src/app/store/app.reducer";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipes.actions";

@Injectable()
export class RecipesEffects {
    @Effect()
    recipesFetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            this.store.dispatch(new RecipesActions.ToggleIsLoading({value: true}));
            return this.http.get<Recipe[]>
        ('https://angularrecipeapp-387f3-default-rtdb.firebaseio.com//recipes.json')
        .pipe(
            map( recipes => {
                this.store.dispatch(new RecipesActions.ToggleIsLoading({value: false}));
                return recipes.map(recipe => {
                    return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
                } )
            }),
            map( recipes => {
                return new RecipesActions.SetRecipes(recipes);
            }),
            catchError(err => {
                this.store.dispatch(new RecipesActions.ToggleIsLoading({value: false}));
                return of(false);
            })
        )
        
    })
    )

    @Effect()
    recipesStoreRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([_, recipesState]) => {
            this.store.dispatch(new RecipesActions.ToggleIsLoading({value: true}));
            return this.http.put('https://angularrecipeapp-387f3-default-rtdb.firebaseio.com//recipes.json'
            , recipesState.recipes).pipe(
                map(resData => {
                return (new RecipesActions.ToggleIsLoading({value: false}));
            }),
            catchError(err => {
                this.store.dispatch(new RecipesActions.ToggleIsLoading({value: false}));
                return of(false);
            }))
        })
    )
    constructor(private actions$: Actions, private http: HttpClient,private store: Store<fromApp.AppState>){}
}