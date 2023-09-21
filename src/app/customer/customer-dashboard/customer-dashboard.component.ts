import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.sass']
})
export class CustomerDashboardComponent implements OnInit {
  displayedProducts: any = [];
  productBrands: any = new Set();
  isNoProducts = false;
  isEmpty = false;
  isValid = false;
  allProducts: any = [];
  allProductsResult: any = [];
  filterProducts: any = [];
  brandFilterProducts: any = [];
  selectedBrand: any;
  searchForm = new FormGroup({
    stext: new FormControl()
  });
  priceFilterForm = new FormGroup({
    minPrice: new FormControl(''),
    maxPrice: new FormControl('')
  })
  constructor(public productApi: ProductService, public router: Router, private route: ActivatedRoute) { }

  openDetails(productCode: any) {
    this.router.navigate(['products/detail/', productCode]);
  }
  ngOnInit(): void {
    this.productApi.getProducts().subscribe((res: any) => {
      this.allProducts = res;
      this.allProductsResult = res;
      for (let item of this.allProductsResult) {
        this.productBrands.add(item.brand);
      }
      if (this.allProducts == '') {
        this.isNoProducts = true;
      }
    })
    this.displayedProducts = this.allProducts;
  }
  

  searchProduct() {
    const searchText = this.searchForm.value.stext;
    if (searchText) {
      this.allProducts = this.allProductsResult.filter((product: any) =>
        product.productCode.toLowerCase().includes(searchText.toLowerCase()) ||
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchText.toLowerCase())
      );
      if (this.allProducts.length === 0) {
        // Show error message
        console.log("No products found matching the search criteria.");
      }
    } else {
      this.allProducts = this.allProductsResult;
    }
  }
  onSelectedBrand(event: any) {
    this.isNoProducts = false;
    this.brandFilterProducts = [];
    this.selectedBrand = event;
    if (this.selectedBrand === "all") {
      this.allProducts = this.allProductsResult;
      return;
    }

    for (let item of this.allProductsResult) {
      if (item.brand.toLowerCase() === this.selectedBrand.toLowerCase()) {
        this.brandFilterProducts.push(item);
      }
    }

    this.allProducts = this.brandFilterProducts;
  }

  filterPrice() {
    this.filterProducts = [];
    this.isNoProducts = false;
    this.isValid = false;
    this.isEmpty = false;
    let minPrice: any = this.priceFilterForm.value.minPrice;
    let maxPrice: any = this.priceFilterForm.value.maxPrice;


    if (minPrice == '' && maxPrice != '') {
      minPrice = 0;
    } else if (minPrice != '' && (maxPrice == '' || maxPrice == null)) {
      maxPrice = Number.MAX_SAFE_INTEGER;
    } else if ((minPrice == '' || minPrice == null) && (maxPrice == '' || maxPrice == null)) {
      this.isEmpty = true;
      return;
    }


    if (minPrice > maxPrice) {
      this.isValid = true;
      return;
    }

    if (this.brandFilterProducts == '' || this.selectedBrand == "all") {
      for (let item of this.allProductsResult) {
        if (item.price >= minPrice && item.price <= maxPrice) {
          this.filterProducts.push(item);
        }
      }
    } else {
      for (let item of this.brandFilterProducts) {
        if (item.price >= minPrice && item.price <= maxPrice) {
          this.filterProducts.push(item);
        }
      }
    }

    this.allProducts = this.filterProducts;
    if (this.allProducts == '') {
      this.isNoProducts = true;
    }
  }

}
