import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";


export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}



const initialState: State = {
  ingredients : [
    new Ingredient('apple',5),
    new Ingredient('banana',6)
],
editedIngredient: null,
editedIngredientIndex: -1

}

export function shoppingListReducer(
    state = initialState,
    action: ShoppingListActions.ShoppingListActions
    ) {

    switch(action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing,index) => {
                    return index !== state.editedIngredientIndex;
                })
            }
        case ShoppingListActions.START_EDITING:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }
        case ShoppingListActions.STOP_EDITING:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default:
            return state;
    }
}