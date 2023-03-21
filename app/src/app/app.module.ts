import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserIndexView } from './views/users-index/users-index.component';
import { UserEditorModule } from './dialogs/user-editor-dialog/user-editor-dialog.module';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    UserIndexView
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,

    UserEditorModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
