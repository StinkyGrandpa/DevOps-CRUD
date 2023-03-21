import { DialogRef } from "@angular/cdk/dialog";
import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { IUser } from "src/app/entities/user.entity";
import { UserService } from "src/app/services/user.service";

@Component({
    templateUrl: "./user-editor-dialog.component.html"
})
export class UserEditorDialog {
    public readonly firstNameControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(254)]);
    public readonly lastNameControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(254)]);
    public readonly ageControl = new FormControl(null, [Validators.min(0)]);

    constructor(
        private readonly dialogRef: DialogRef,
        private readonly usersService: UserService
    ) {}

    public createUser() {
        if(this.firstNameControl.invalid || this.lastNameControl.invalid || this.ageControl.invalid) return;

        const data: Omit<IUser, "id" | "enabled"> = {
            firstName: this.firstNameControl.value as string,
            lastName: this.lastNameControl.value as string,
            age: Number(this.ageControl.value)
        }

        this.usersService.createUser(data).subscribe((request) => {
            if(request.loading) return;
            if(request.error) return;

            this.dialogRef.close(request.data);
        });
    }

}