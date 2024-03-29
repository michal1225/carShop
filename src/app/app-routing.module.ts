import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ShopComponent} from "./shop/shop.component";
import {LoginComponent} from "./login/login.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: 'shop', component: ShopComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
