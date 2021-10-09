import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SeaOfThievesComponent } from './sea-of-thieves/sea-of-thieves.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TradeCoffeeComponent } from './trade-coffee/trade-coffee.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SeaOfThievesComponent,
    TradeCoffeeComponent
  ],
  imports: [
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
