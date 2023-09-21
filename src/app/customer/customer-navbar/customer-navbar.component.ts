import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-customer-navbar',
  templateUrl: './customer-navbar.component.html',
  styleUrls: ['./customer-navbar.component.css']
})
export class CustomerNavbarComponent implements OnInit {
  constructor(private service: UserService,  private router: Router, private _coreService:CoreService) { }
  userName: string = "";
  ngOnInit(): void {
    if (this.service.getloginUserName() != null) {
      this.userName = this.service.getloginUserName()
    }
  }
  

  //This method is used for logout user
  logOutLogin() {
    if(confirm("Are you sure to Logout ?")) { 
    this.service.logOut();
    //location.reload();
    this._coreService.openSnackBar("Logout Successfully","close")
    this.router.navigate(["/home"])
    }
  }



}
