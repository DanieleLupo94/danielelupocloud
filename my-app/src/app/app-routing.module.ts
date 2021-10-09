import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeaOfThievesComponent } from './sea-of-thieves/sea-of-thieves.component';
import { TradeCoffeeComponent } from './trade-coffee/trade-coffee.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'SeaOfThieves', component: SeaOfThievesComponent },
  { path: 'TradeCoffee', component: TradeCoffeeComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
