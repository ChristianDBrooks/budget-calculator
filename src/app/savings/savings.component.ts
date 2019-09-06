import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {
  monthlySavings;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.monthlySavings = this.dataService.calcSavings();
  }

}
