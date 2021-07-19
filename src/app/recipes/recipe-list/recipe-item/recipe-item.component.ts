import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  
  @Input() recipeId: number;
  recipe: Recipe;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('recipes').subscribe(recipesState => {
      this.recipe = recipesState.recipes.find((recipe,index) => {
        return index === this.recipeId;
      })
    })
  }

  

}
