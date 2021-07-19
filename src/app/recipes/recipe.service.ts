import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shoping-list/shopping-list.service";
import { AddIngredients } from "../shoping-list/store/shopping-list.actions";
import * as fromShoppingList from "../shoping-list/store/shopping-list.reducer";
import * as fromAppState from "../store/app.reducer";
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    public isLoadingRecipes: boolean = false;

    // private recipes : Recipe[] = [new Recipe('Test Recipe','What else do you need me to Say !','https://post.healthline.com/wp-content/uploads/2020/07/pizza-beer-1200x628-facebook-1200x628.jpg'
    // ,[new Ingredient('bread',5),new Ingredient('meat',1)]),
    // new Recipe('Test Recipe 2','This is just a Test Recipe','https://post.healthline.com/wp-content/uploads/2020/07/pizza-beer-1200x628-facebook-1200x628.jpg'
    // ,[new Ingredient('buiscuits',4),new Ingredient('banana',12)])];
    
    private recipes: Recipe[] = [];
    constructor(private store: Store<fromAppState.AppState>) {};
    public recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

    public getRecipes() {
        return this.recipes.slice();
    }

    public getRecipe(recipeId: number): Recipe {
        return this.recipes[recipeId];
    }

    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    public updateRecipe(id: number, recipe: Recipe) {
        this.recipes[id] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    public deleteRecipe(id: number) {
        this.recipes.splice(id,1);
        this.recipesChanged.next(this.recipes.slice());
    }
    public addIngredientsToTheShoppingList(ingredients: Ingredient[]){
        this.store.dispatch(new AddIngredients(ingredients));
    }

    public setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

}