import { NgModule } from "@angular/core";
import { UserEditorDialog } from "./user-editor-dialog.component";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from "@angular/common";
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        UserEditorDialog
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule
    ],
    exports: [
        UserEditorDialog
    ]
})
export class UserEditorModule {}