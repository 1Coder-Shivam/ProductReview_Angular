import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../service/user.service';
import { CoreService } from '../core/core.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {
  user: User = {
    emailId: "",
    firstName: "",
    lastName: "",
    password: "",
    userType: "customer"
  }
  message = "";
  constructor(private service: UserService, private router: Router, private _coreService: CoreService) { }

  ngOnInit(): void {
  }
  
  userRegistration() {
    console.log(this.user);
    this.service.userRegistrationFromRemote(this.user)
      .pipe(
        catchError((error: any) => {
          console.log("exception occurred");
          this.message = "This email id already exists";
          return [];
        })
      )
      .subscribe((data: any) => {
        console.log(this.user);
        this._coreService.openSnackBar("User Registered Successfully", "close");
        this.router.navigate(['/login']);
      });
  }
}
