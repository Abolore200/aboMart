import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDirective } from './AppDirective/app.directive';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { CanActivateService } from './RouteGuard/can-activate.service';
import { AuthService } from './RouteGuard/auth.service';
import { HttpService } from './AppService/http.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
// import Aura from '@primeuix/themes/aura';

@NgModule({
  declarations: [
    AppComponent,
    AppDirective,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    WishlistComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    CanActivateService,
    AuthService,
    provideAnimationsAsync(),
    // providePrimeNG({
    //     theme: {
    //         preset: Aura
    //     }
    // })
    // HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
