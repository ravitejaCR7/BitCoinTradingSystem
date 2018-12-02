import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestingPartComponent } from './testing-part/testing-part.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { BuyBitCoinsComponent } from './buy-bit-coins/buy-bit-coins.component';
import { SellBitCoinsComponent } from './sell-bit-coins/sell-bit-coins.component';
import { HomepageTraderComponent } from './homepage-trader/homepage-trader.component';
import { ManagerModuleComponent } from './manager-module/manager-module.component';

const routes: Routes = [
  {path:'login' , component: LandingPageComponent},
  {path:'homepage', component: HomePageComponent},
  {path:'register', component: RegistrationPageComponent},
  {path :'testing' , component : TestingPartComponent},
  {path :'buyBit' , component : BuyBitCoinsComponent},
  {path :'sellBit' , component : SellBitCoinsComponent},
  {path :'homepageTrader' , component : HomepageTraderComponent},
  {path : 'managerHomePage', component : ManagerModuleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
