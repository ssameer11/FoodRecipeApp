import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { AddIngredient, DeleteIngredient, StopEditing, UpdateIngredient } from '../store/shopping-list.actions';


@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f',{static: true}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editIngredientIndex: number;
  editIngredient: Ingredient;
  
  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editIngredientIndex = stateData.editedIngredientIndex;
        this.editIngredient = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        })
      } else {
        this.editMode = false;
      }
    })
  }

  onAddIngredient(form: NgForm) {

    const ingName = form.value.name;
    const ingAmount = +(form.value.amount)
    const ingredient = new Ingredient(ingName,ingAmount)
    if(this.editMode) {
      this.store.dispatch(new UpdateIngredient(ingredient));
      this.editMode = false;
    }else {
      this.store.dispatch(new AddIngredient(ingredient));
    }
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEditing());
    this.editMode = false;
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(new StopEditing());
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }
}
