import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data = {
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlySavings: 0
  }

  constructor() { }

  get(key) {
    // console.log("DataService.get("+ key +"):", this.data[key])
    return this.data[key];
  }
  
  set(key, value) {
    // console.log("DataService.set("+ key +"):", value)
    this.data[key] = value;
  }

  calcSavings() {
    this.data.monthlySavings = this.data.monthlyIncome - this.data.monthlyExpenses
    return this.data.monthlySavings
  }
}
