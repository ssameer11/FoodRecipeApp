import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromAppReducer from "../store/app.reducer";
import { AuthService, AuthResponseData } from "./auth.service";
import * as AuthActions from "./store/auth.actions";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy  {

    public isLogInMode = true;
    public isLoading = false;
    public error: string = null;
    private alertSub: Subscription;
    private storeSub: Subscription;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    ngOnInit() {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.error = authState.errorMessage;
            if(this.error) {
                this.showAlertComponent(this.error);
            }
            this.isLoading = authState.isLoading;
        })
    }

    constructor(private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromAppReducer.AppState>) {
            
        };
    onSwitchMode() {
        this.isLogInMode = !this.isLogInMode;
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.onHandleError();
        let authObs: Observable<AuthResponseData>;
        if(this.isLogInMode) {
            this.store.dispatch(new AuthActions.StartLogin({
                email: email,
                password: password
            }))
        }else {
            this.store.dispatch(new AuthActions.SignUpStart({ email: email,password: password}));
        }

    }

    onHandleError() {
        this.store.dispatch(new AuthActions.ClearErrors());
    }

    showAlertComponent(errorMessage: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
            );
        this.alertHost.viewContainerRef.clear();
        const alertComponentRef = this.alertHost.viewContainerRef.createComponent(alertComponentFactory);
        alertComponentRef.instance.message = errorMessage;
       this.alertSub = alertComponentRef.instance.close.subscribe( () => {
            this.alertHost.viewContainerRef.clear();    
        this.alertSub.unsubscribe();
        })
    }

    ngOnDestroy() {
        this.alertHost.viewContainerRef.clear();
        if(this.alertSub) {
            this.alertSub.unsubscribe();
        }
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}