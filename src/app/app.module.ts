import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { CreateNoteComponent } from './create-note/create-note.component';

// Imported Library
import {
  NzCardModule,
  NzInputModule,
  NzButtonModule,
  NzIconModule,
  NzModalModule,
  NzPopoverModule,
  NzGridModule,
  NzCollapseModule,
  NzDropDownModule,
  NzFormModule,
  NzAlertModule
} from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import {AutosizeModule} from 'ngx-autosize';
import { NotesListComponent } from './notes-list/notes-list.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BuildingAccountComponent } from './building-account/building-account.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CreateNoteComponent,
    NotesListComponent,
    EditNoteComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    BuildingAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    AutosizeModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzPopoverModule,
    NzGridModule,
    NzCollapseModule,
    NzDropDownModule,
    NzAlertModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
