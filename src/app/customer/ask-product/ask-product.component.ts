import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { ProductService } from 'src/app/service/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-ask-product',
  templateUrl: './ask-product.component.html',
  styleUrls: ['./ask-product.component.css']
})
export class AskProductComponent implements OnInit {
  productCode!: string;
  name!: string;
  brand!: string;
  isProductExists: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    public productApi: ProductService,
    public router: Router,
    private route: ActivatedRoute,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {}

  openForm() {
    this.productApi.getProductById(this.productCode).pipe(take(1)).subscribe({
      next: (res: any) => {
        this.isProductExists = true;
        this.successMessage = '';
        this.errorMessage = 'Product already exists! Redirecting in 5 seconds...';
        this._coreService.openSnackBar(this.errorMessage, 'close');
        setTimeout(() => {
          this.router.navigate(['/products/detail/' + this.productCode]);
        }, 5000);
      },
      error: (error: any) => {
        const product = {
          productCode: this.productCode,
          name: this.name,
          brand: this.brand
        };
        this.productApi.saveProduct(product).pipe(take(1)).subscribe({
          next: (res: any) => {
            this.isProductExists = false;
            this.successMessage = 'Your response has been recorded successfully!';
            this.errorMessage = '';
            this._coreService.openSnackBar(this.successMessage, 'close');
            this.router.navigate(['customer/dashboard']);
          },
          error: (error: any) => {
            this.isProductExists = false;
            this.successMessage = '';
            this.errorMessage = 'Error saving product. Please try again.';
            console.error('Error saving product:', error);
            this._coreService.openSnackBar(this.errorMessage, 'close');
          }
        });
      }
    });
  }
}
