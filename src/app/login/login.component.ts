import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { CoreService } from '../core/core.service';
import { tap, catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  user = {
    emailId: "",
    password: ""
  }
  message = "";
  constructor(private service: UserService, private router: Router,private _coreService:CoreService) { }

  ngOnInit(): void {
    console.log(this.service.isLoggedIn());
  }

  //This method is used for user login
  loginUser() {
    console.log(this.user);
    this.service.loginUserFromRemote(this.user).pipe(
      tap((data: any) => {
        console.log(data);
        this.service.loginUser(data.token, data.userName, data.userType);
        if (data.userType == "customer") {
          this.router.navigate(["customer/dashboard"]);
          this._coreService.openSnackBar("Customer Login Successfully", "close");
        } else if (data.userType == "admin") {
          this.router.navigate(["admin/dashboard"]);
          this._coreService.openSnackBar("Admin Login Successfully", "close");
        }
      }),
      catchError((error: any) => {
        console.log("exception occur");
        console.log(error);
        this.message = "Bad Credential, please enter a valid emailId and password";
        return EMPTY;
      })
    ).subscribe();
  }
}  
