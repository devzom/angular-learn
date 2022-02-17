import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HeroComponent} from './components/base/hero/hero.component';
import {ButtonComponent} from './components/base/button/button.component';
import {CardComponent} from './vehicles/components/rental/card/card.component';
import {SummaryComponent} from './vehicles/components/rental/summary/summary.component';
import {CategoriesComponent} from './vehicles/components/rental/categories/categories.component';

// directives
import {DefinitionDirective} from './directives/definition.directive';
import {CheckoutComponent} from './vehicles/components/rental/checkout/checkout.component';
import {AppRoutingModule} from "./app.routing.module";
import {RentalDetailsComponent} from './vehicles/views/rental-details/rental-details.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {RentalListingComponent} from './vehicles/views/rental-listing/rental-listing.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';
import {HomepageComponent} from './views/homepage/homepage.component';
import {FiltersComponent} from './vehicles/components/rental/filters/filters.component';
import {VehiclesModule} from './vehicles/vehicles.module';


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
    RentalListingComponent,
    PageNotFoundComponent,
    HomepageComponent,
    FiltersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    // VehiclesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
