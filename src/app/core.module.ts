import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interseptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shoping-list/shopping-list.service";


@NgModule({
    providers: [
        ShoppingListService,
        RecipeService,

        {provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true}],
  // entryComponents: [AlertComponent],
  
})
export class CoreModule {

}