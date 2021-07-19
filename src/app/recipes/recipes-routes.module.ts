import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipe } from "./select-recipe/select-recipe.component";

const recipesRoutes: Routes= [
    {path: '', component: RecipesComponent, resolve: [RecipeResolver], children:[
        {path: '' , component: SelectRecipe , pathMatch: 'full'},
        {path: 'new', canActivate: [AuthGuardService], component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent},
        {path: ':id/edit', canActivate: [AuthGuardService], component: RecipeEditComponent},
    ]},
]
@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutes {

}