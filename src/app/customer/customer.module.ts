import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerNavbarComponent } from './customer-navbar/customer-navbar.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AskProductComponent } from './ask-product/ask-product.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { MaterialModules } from '../material-modules';

@NgModule({
  declarations: [
    CustomerDashboardComponent,
    CustomerNavbarComponent,
    CustomerProductComponent,
    CustomerProductComponent,
    ProductDetailComponent,
    AskProductComponent,
    ReviewFormComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
  ]
})
export class CustomerModule { }
