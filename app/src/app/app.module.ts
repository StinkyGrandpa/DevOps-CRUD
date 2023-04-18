import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserIndexViewComponent } from './views/users-index/users-index.component';
import { UserEditorModule } from './dialogs/user-editor-dialog/user-editor-dialog.module';
import {MatIconModule} from '@angular/material/icon';
import { LoaderComponent } from './views/loader/loader.component';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TokenHttpInterceptor } from './modules/authentication/interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserIndexViewComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MatTableModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,

    AuthenticationModule,
    UserEditorModule
  ],
  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
