import { Component, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { LoggingService } from '../logging.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AppState } from '../store/app.reducer';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe;
  isLoadingRecipes = false;
  isMobile = false;
  constructor(private eventManager: EventManager,private store: Store<AppState>){
    eventManager.addGlobalEventListener('window','resize',(event => {
      this.isMobile = event.target.innerWidth <= 460;
    }))
}

  ngOnInit(): void {
    this.store.select('recipes').subscribe(recipesState => {
      this.isLoadingRecipes = recipesState.isLoading;
    })
  }

  
}
