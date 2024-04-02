import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { CanActivateService } from './RouteGuard/can-activate.service';

const routes: Routes = [
  // {path:'',redirectTo:'',pathMatch:'full'},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'cart',component:CartComponent},
  {path:'cart/checkout',component:CheckoutComponent, canActivate: [CanActivateService]},
  {path:'product/:id',component:ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
