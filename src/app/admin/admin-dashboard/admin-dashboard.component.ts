import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/service/home.service';
import { ReviewService } from 'src/app/service/review.service';
import { UserService } from 'src/app/service/user.service';
import * as _ from 'lodash';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id','productCode','body', 'rating', 'date','userName','action'];
  dataSource!: MatTableDataSource<any>;
  reviewList:any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private homeService: HomeService, private router: Router,private _dialog: MatDialog, 
    private reviewService: ReviewService,private _coreService:CoreService) { }
  userName: string = "";
  
  ngOnInit(): void {
    if (this.service.getloginUserName() != null) {
      this.userName = this.service.getloginUserName()
    }
    this.getReviewsList();

  }
  

  //This method is used for logout user
  logOutLogin() {
    if(confirm("Are you sure to Logout ?")) { 
    this.service.logOut();
    //location.reload();
    this.router.navigate(["/home"])
    }
  }
  getReviewsList(){
    this.reviewService.getReviews().subscribe({
      next:(res)=>{
        this.reviewList=res;
        this.dataSource = new MatTableDataSource(res);
        
        let filteredData = _.filter(this.reviewList,(item) =>{
          return item.status.toLowerCase() ==  "pending".toLowerCase();
        })
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log,
    });
  }


  declineReview(id: number){
    this.reviewService.setReviewStatus(id,'declined',null).subscribe({
      next: (res: any) => {
        this._coreService.openSnackBar('Review Declined Successfully', 'Close')
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    location.reload();
  }

  acceptReview(id: number){
    this.reviewService.setReviewStatus(id,"accepted",null).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    location.reload();
  }
}