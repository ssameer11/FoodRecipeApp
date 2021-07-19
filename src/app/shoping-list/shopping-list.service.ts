import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService  {
  public ingredientsChanged = new Subject<Ingredient[]>();
  public editingStarted = new Subject<number>();
  private ingredients : Ingredient[] = [];
    

  public getIngredients() {
      return this.ingredients.slice();
  }
  public getIngredient(id: number) {
    return this.ingredients[id];
  }

  public addIngredient(ingredient: Ingredient){
    let alreadyExist = false;
      this.ingredients.map(i => {
        if(i.name === ingredient.name) {
          alreadyExist = true;
          i.amount += ingredient.amount;
        }
        return i;
      })
      if(!alreadyExist){
        this.ingredients.push(ingredient);
      }
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  public updateIngredient(id: number,newIngredient: Ingredient){
   
    this.ingredients[id] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  public deleteIngredient(id: number) {
    this.ingredients.splice(id,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  public addIngredients(ingredients: Ingredient[]){
    const tempIngredients = [...ingredients];
    tempIngredients.forEach(ing => {
      let added = false;
     
      this.ingredients.map(i => {
        if(i.name === ing.name){
              i.amount += ing.amount;
              added = true;
              return;
            }
          })
          if(!added) {

            this.ingredients.push(ing)
          }
    })
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}