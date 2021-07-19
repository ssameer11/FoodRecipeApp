import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes : Recipe[];
  private subscription: Subscription;
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
   }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
    .pipe(map(recipesState => {
      return recipesState.recipes
    }))
    .subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

 onNewRecipe() {
    this.router.navigate(['new'],{relativeTo: this.route});
 }

 ngOnDestroy() {
   this.subscription.unsubscribe();
 }
}
