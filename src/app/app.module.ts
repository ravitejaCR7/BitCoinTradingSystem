import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NamesParentComponent } from './names-parent/names-parent.component';
import { ChildNamesComponent } from './child-names/child-names.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestingPartComponent } from './testing-part/testing-part.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { PrimaryKeyClassService } from './primary-key-class.service';
import { BuyBitCoinsComponent } from './buy-bit-coins/buy-bit-coins.component';
import { SellBitCoinsComponent } from './sell-bit-coins/sell-bit-coins.component';
import { HomepageTraderComponent } from './homepage-trader/homepage-trader.component';
import { TraderChildsComponent } from './trader-childs/trader-childs.component';

@NgModule({
  declarations: [
    AppComponent,
    NamesParentComponent,
    ChildNamesComponent,
    LandingPageComponent,
    TestingPartComponent,
    HomePageComponent,
    RegistrationPageComponent,
    BuyBitCoinsComponent,
    SellBitCoinsComponent,
    HomepageTraderComponent,
    TraderChildsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [PrimaryKeyClassService],
  bootstrap: [AppComponent]
})
export class AppModule { }
