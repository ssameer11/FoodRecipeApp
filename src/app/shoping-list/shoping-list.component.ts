import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from  'rxjs';
import { Store } from '@ngrx/store';
import { StartEditing } from './store/shopping-list.actions';
import * as fromAppReducer from '../store/app.reducer';


@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
  
})
export class ShopingListComponent implements OnInit {

  public ingredients: Observable<{ingredients: Ingredient[]}>;
  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    }


  onEditIngredient(id: number){
    this.store.dispatch(new StartEditing(id));
  }

 
  
}
