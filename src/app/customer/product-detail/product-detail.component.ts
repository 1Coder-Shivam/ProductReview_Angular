import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  str!: any;
  detail: any;
  isDeliverable: any;
  expectedtime: any;
  result: any = {};
  productCode: any;
  checkForm = new FormGroup({
    dtext: new FormControl(),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ProductService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.str = params['str'];
    });
    this.api.getProductById(this.str).subscribe((res: any) => {
      this.detail = res;
      this.detail.reviews = this.detail.reviews.filter(
        (review: any) => review.status === 'accepted'
      );
      console.log(this.detail);
    });
  }

  //To calculate average rating on the product
  calculateOverallRating(): string {
    if (this.detail && this.detail.reviews && this.detail.reviews.length > 0) {
      let sum = 0;
      let count = 0;
      for (const review of this.detail.reviews) {
        if (review.status === 'accepted') {
          sum += review.rating;
          count++;
        }
      }
      if (count > 0) {
        const averageRating = sum / count;
        const formattedRating = averageRating.toFixed(2); // Limit to two decimal points
        return formattedRating + ' (' + count + ' users)'; // Append user count
      }
    }
    return '0.00 (0 users)'; // Default value if no reviews found
  }
  

  openReviewForm(productCode: any) {
    this._dialog.open(ReviewFormComponent, {
      width: '400px',
      data: {
        productCode: productCode
      }
    });
  }
}
