import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeroComponent} from './components/base/hero/hero.component';
import {ButtonComponent} from './components/base/button/button.component';
import {CardComponent} from './components/rental/card/card.component';
import {SummaryComponent} from './components/rental/summary/summary.component';
import { DefinitionDirective } from './directives/definition.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ButtonComponent,
    ButtonComponent,
    CardComponent,
    SummaryComponent,
    DefinitionDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
