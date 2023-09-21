import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailComponent } from './customer/product-detail/product-detail.component';
import { AskProductComponent } from './customer/ask-product/ask-product.component';
import { AuthenticationGuard } from './gaurds/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: 'home', pathMatch: 'full' },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "customer/dashboard", component: CustomerDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: "admin/dashboard", component: AdminDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: "customer/products/:str", component: AskProductComponent, canActivate: [AuthenticationGuard] },
  { path: "products/detail/:str", component: ProductDetailComponent, canActivate: [AuthenticationGuard] },
  { path: "customer/dashboard/askproduct", component: AskProductComponent, canActivate: [AuthenticationGuard] },
  { path: "customer/dashboard/askproduct/askproduct", component: AskProductComponent, canActivate: [AuthenticationGuard] },
  { path: "products/detail/:str/askproduct", component: AskProductComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
