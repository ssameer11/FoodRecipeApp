import * as fromShoppingList from '../shoping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRecipes from '../recipes/store/recipes.reducers';

export interface AppState {
    shoppingList: fromShoppingList.State,
    auth: fromAuth.State,
    recipes: fromRecipes.State
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipesReducer
}