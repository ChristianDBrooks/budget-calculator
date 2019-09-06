import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  monthlyIncome: number;
  incomeInput = 50000;
  incomeAfterTax: number;
  increment = 'Yearly';
  taxStatus = 'single';
  taxPercentage: number = 10;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.calcTaxPercentage();
  }

  setIncrement(e) {
    let elems = document.querySelectorAll('.incrementBtn');
    [].forEach.call(elems, (el) => {
      el.classList.remove('selected')
    })
    e.target.classList.add('selected');
    this.increment = e.target.innerText;
    this.calcTaxPercentage();
  }

  setTaxStatus(e) {
    let elems = document.querySelectorAll('.filingBtn');
    [].forEach.call(elems, (el) => {
      el.classList.remove('selected')
    })
    e.target.classList.add('selected');
    this.taxStatus = e.target.dataset.filingtype;
    this.calcTaxPercentage();
  }

  calcTaxPercentage() {
    // First get our user input normalized to the amount they will make annually.
    let income = this.incomeInput;
    if (this.increment !== "Yearly") {
      income = this.incomeInput * 12;
    } 

    // Then based on the tax status check the yearly income in the bracket and get percentage.
    const data = {
      "single": {
        10: 9700,
        12: 39475,
        22: 84200,
        24: 160725,
        32: 204100,
        35: 510300,
        37: 510301,
      },
      "joint": {        
        10: 19400,
        12: 78950,
        22: 168400,
        24: 321450,
        32: 408200,
        35: 612350,
        37: 612351
      },
      "head": {
        10: 13850,
        12: 52850,
        22: 84200,
        24: 160700,
        32: 204100,
        35: 510300,
        37: 510301
      }
    }

    // Find the taxPercentage based on income and tax status.
    // If income is greater then maximum tax bracket, default to 37
    if (income > data[this.taxStatus][37]) {
      this.taxPercentage = 37;
    } else {
      // Else check income against each income range until one matches.
      let percentages = [10,12,22,24,32,35];
      for(let i of percentages) {
        if (income < data[this.taxStatus][i]) {
          this.taxPercentage = i
          break;
        }
      }
    }

    // This finds the percentage of money kept from the total then converts
    // to decimal and mutiplies the total income by the percentage kept.
    this.incomeAfterTax = income * ((100 - this.taxPercentage) / 100)
    this.calcMonthlyIncome();
  }

  calcMonthlyIncome() {
    switch (this.increment) {
      case 'Monthly': {
        this.dataService.set('monthlyIncome', this.incomeAfterTax);
        break;
      }
      default: {
        this.dataService.set('monthlyIncome', (this.incomeAfterTax / 12));
        break;
      }
    }
    this.dataService.calcSavings();
  }

}
