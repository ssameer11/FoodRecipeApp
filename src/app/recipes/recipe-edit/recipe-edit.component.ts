import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';
import * as RecipesActions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  public recipeForm: FormGroup;
  public recipeId: number = -1;
  public editRecipe: Recipe;
  public editMode: boolean = false;
  private theSubscription: Subscription;
  private storeSub: Subscription;

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) {  }

  
  ngOnInit(): void {
    this.theSubscription = this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.editMode = this.recipeId >= 0;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let ingredientsArray = new FormArray([]);
    if(this.editMode) {
     this.storeSub =  this.store.select('recipes').pipe( map(recipesState => {
        return this.editRecipe = recipesState.recipes.find((recipe,index) => {
          return index === this.recipeId;
        })
      })).subscribe((recipe: Recipe) => {
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          ingredientsArray.push(new FormGroup({
            'name': new FormControl(ingredient.name,Validators.required),
            'amount': new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[0-9]+[1-9]*$/)])
          }))
        }
      }
      })
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'description': new FormControl(recipeDescription,Validators.required),
      'ingredients': ingredientsArray
    })
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null,Validators.required),
      'amount': new FormControl(null,[
        Validators.required,
        Validators.pattern(/^[0-9]+[1-9]*$/)
      ])
    }))
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  ngOnDestroy() {
    if(this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSubmit() {
    if(this.editMode){
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.recipeId, newRecipe: this.recipeForm.value}))
    }else {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }
    this.recipeForm.reset();
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'],{relativeTo: this.route});
  }
}
