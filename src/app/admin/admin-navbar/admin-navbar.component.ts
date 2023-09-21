import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.sass']
})
export class AdminNavbarComponent implements OnInit {
  constructor(private service: UserService,  private router: Router) { }
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
    this.router.navigate(["/home"])
    }
  }
}
