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
  NzDropDownModule
} from 'ng-zorro-antd';
import {AutosizeModule} from 'ngx-autosize';
import { NotesListComponent } from './notes-list/notes-list.component';
import { EditNoteComponent } from './edit-note/edit-note.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CreateNoteComponent,
    NotesListComponent,
    EditNoteComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzInputModule,
    AutosizeModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzPopoverModule,
    NzGridModule,
    NzCollapseModule,
    NzDropDownModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
