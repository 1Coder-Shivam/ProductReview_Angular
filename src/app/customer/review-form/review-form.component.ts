import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit{
  reviewForm!: FormGroup;
  userName: string = "";
  constructor(private service: UserService,private _fb: FormBuilder,
    private _reviewService:ReviewService,
    private _dialogRef: MatDialogRef<ReviewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService) {
      this.reviewForm = this._fb.group({
        rating: [''],
        headline: [''],
        review: [''],
        body: [''],
        userName: this.service.getloginUserName(),
        productCode: this.data.productCode,
        status: ['pending']
      });

     }


  ngOnInit(): void {
    this.reviewForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.reviewForm.valid) {
      this._reviewService.addReview(this.reviewForm.value).subscribe({
        next: () => {
          this._coreService.openSnackBar("Review Added Successfully","close")
          this._dialogRef.close();
          location.reload();
        }
      });
    }
  }

}
