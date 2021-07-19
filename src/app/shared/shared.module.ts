import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { NavDrop } from "./navDrop.directive";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { SpinnerLoaderComponent } from "./spinner-loader/spinner-loader.component";

@NgModule({
    declarations: [
        AlertComponent,
        PlaceholderDirective,
        SpinnerLoaderComponent,
        DropdownDirective,
        NavDrop,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        PlaceholderDirective,
        SpinnerLoaderComponent,
        DropdownDirective,
        NavDrop,
        CommonModule
    ]
})
export class SharedModule {

}