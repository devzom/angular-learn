import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HeroComponent} from './components/base/hero/hero.component';
import {ButtonComponent} from './components/base/button/button.component';
import {CardComponent} from './components/rental/card/card.component';
import {SummaryComponent} from './components/rental/summary/summary.component';
import {CategoriesComponent} from './components/rental/categories/categories.component';

// directives
import {DefinitionDirective} from './directives/definition.directive';
import {CheckoutComponent} from './components/rental/checkout/checkout.component';
import {AppRoutingModule} from "./app.routing.module";
import {RentalDetailsComponent} from './views/rental-details/rental-details.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ButtonComponent,
    ButtonComponent,
    CardComponent,
    SummaryComponent,
    DefinitionDirective,
    // directives
    CategoriesComponent,
    CheckoutComponent,
    SummaryComponent,
    RentalDetailsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
