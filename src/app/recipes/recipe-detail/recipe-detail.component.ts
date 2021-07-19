import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as RecipesActions from '../store/recipes.actions';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe ;
  recipeId: number;
  theSubscription: Subscription;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.theSubscription = this.route.params.pipe(map(params => {
      return +params['id'];
    }),switchMap(id => {
      this.recipeId = id;
      return this.store.select('recipes');
    }),
    map(recipesState => {
      return recipesState.recipes.find((recipe,index) => {
        return index === this.recipeId;
      })
    })).subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  onToShoppingList() {
    this.recipeService.addIngredientsToTheShoppingList(this.recipe.ingredients.slice());
  }

  onUpdateRecipe() {
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  onDelete() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    if(this.theSubscription) {
      this.theSubscription.unsubscribe();
    }
  }
}
