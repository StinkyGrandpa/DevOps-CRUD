import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginViewComponent } from "./views/login/login.component";
import { RouterModule } from "@angular/router";
import { ResetViewComponent } from "./views/reset/reset.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginViewComponent,
        ResetViewComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    providers: [
        
    ]
})
export class AuthenticationModule {}