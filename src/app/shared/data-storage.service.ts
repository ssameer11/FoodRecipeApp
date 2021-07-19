import { HttpClient} from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipes.actions";


@Injectable({ providedIn: 'root'})
export class DataStorageService  {

    
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<fromApp.AppState>) {}


 
    
    public storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angularrecipebook-69d94-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe();
    }

    public fetchRecipes() {
        return this.http.get<Recipe[]>
        ('https://angularrecipebook-69d94-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
        map( recipes => {
            return recipes.map(recipe => {
                return {...recipe,ingredients: recipe.ingredients ? recipe.ingredients : []}
            } )
        }),tap(recipes => {
            this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        }))
        
    }
}