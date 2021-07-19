import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
// import { RecipesModule } from './recipes/recipes.module';


const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes' , pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
    {path: 'shopping-list', loadChildren: () => import('./shoping-list/shopping-list.module').then(m => m.ShoppingListModule)},
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutes{}