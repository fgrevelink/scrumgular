import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ScrumboardComponent } from './scrumboard/scrumboard.component';
import { ListComponent } from './list/list.component';
import { UserstoryComponent } from './userstory/userstory.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrumboardComponent,
    ListComponent,
    UserstoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
