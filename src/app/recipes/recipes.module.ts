import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutes } from "./recipes-routes.module";
import { RecipesComponent } from "./recipes.component";
import { SelectRecipe } from "./select-recipe/select-recipe.component";

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent,
        SelectRecipe
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        RecipesRoutes,
        SharedModule
    ],
    // exports: [RecipeListComponent,
    //     RecipesComponent,
    //     RecipeDetailComponent,
    //     RecipeItemComponent,
    //     RecipeEditComponent,
    //     SelectRecipe]
})
export class RecipesModule {}