import { StoreService } from './shared/services/store.service';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SingleContactComponent } from './components/contacts/single-contact/single-contact.component';
import { MessageComponent } from './components/message/message.component';

registerLocaleData(en);
const routes: Routes = [
  { path: '', component: ContactsComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact', component: SingleContactComponent }

];
@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ToolbarComponent,
    SingleContactComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    RouterModule.forRoot(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [StoreService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
