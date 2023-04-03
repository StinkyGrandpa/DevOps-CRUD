import { Component, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IUser } from "src/app/entities/user.entity";
import { UserService } from "src/app/services/user.service";

@Component({
    templateUrl: "./user-editor-dialog.component.html"
})
export class UserEditorDialogComponent {

    public readonly firstNameControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(254)]);
    public readonly lastNameControl = new FormControl('', [Validators.required, Validators.minLength(0), Validators.maxLength(254)]);
    public readonly ageControl = new FormControl<number | null>(null, [Validators.min(0)]);

    constructor(
        private readonly dialogRef: MatDialogRef<UserEditorDialogComponent>,
        private readonly usersService: UserService,
        @Inject(MAT_DIALOG_DATA) public data: IUser
    ) {
        if (data) {
            this.firstNameControl.setValue(data.firstName);
            this.lastNameControl.setValue(data.lastName);
            this.ageControl.setValue(data.age as number);
        }
    }
    public submitForm() {
        if (this.data) {
            this.updateUser()
            return;
        }
        this.createUser()
    }

    public createUser() {


        if (this.firstNameControl.invalid || this.lastNameControl.invalid || this.ageControl.invalid) return;

        const data: Omit<IUser, "id" | "enabled"> = {
            firstName: this.firstNameControl.value as string,
            lastName: this.lastNameControl.value as string,
            age: Number(this.ageControl.value)
        }

        this.usersService.createUser(data).subscribe((request) => {
            if (request.loading) return;
            if (request.error) return;

            this.dialogRef.close(request.data);
        });
    }

    public updateUser() {
        const data: Omit<IUser, "id" | "enabled"> = {
            firstName: this.firstNameControl.value as string,
            lastName: this.lastNameControl.value as string,
            age: Number(this.ageControl.value)
        }
        this.usersService.updateUser(this.data.id, data).subscribe((request) => {
            if (request.loading) return;
            if (request.error) return;

            this.dialogRef.close(request.data);
        })
    }

}