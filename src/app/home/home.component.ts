import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Stats } from '../model/Stats';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stats$!: Observable<Stats>;

  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.stats$ = this.service.getStatsFromRemote();
  }
}
