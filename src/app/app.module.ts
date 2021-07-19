import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutes } from './app-routes.module';
import { HttpClientModule} from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipesEffects } from './recipes/store/recipes.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// {shoppingList: shoppingListReducer, auth: authReducer}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AuthEffects,RecipesEffects]),
    AppRoutes,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  // providers: [RecipeService,
  //   ShoppingListService
  //   ,{provide:HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptorService,
  //   multi: true}],
  // // // providers: [
  // // //   ShoppingListService
  // // //   ,RecipeService,
  // // //   {provide:HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
