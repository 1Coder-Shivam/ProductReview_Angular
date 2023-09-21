import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit{
  
  userName:any=""
  constructor(private service:UserService, private router:Router) { }

  ngOnInit(): void {
  this.userName=this.service.getloginUserName();
  }
  goToHomePage(): void {
    this.router.navigate(['/home']); 
  }

}
