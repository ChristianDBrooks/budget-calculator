import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  indexList = [0];
  expenseList: number[] = [0];
  monthlyExpenses;
  totalSavings = '--';

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.calcExpenses();
  }

  addInput() {
    this.indexList.push(this.indexList.length);
    this.expenseList.push(0);
    console.log(this.indexList, this.expenseList);
  }

  calcExpenses(): void {
    this.dataService.set('monthlyExpenses', this.expenseList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0))
    this.dataService.calcSavings();
  }
}
