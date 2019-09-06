import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('pieChart', {static: true}) private chartRef;
  chart: any;
  labels = ['Tax Debt', 'Expenses', 'Savings'];
  dataPoints = [22000, 21600, 17400]

  constructor() { }

  ngOnInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labels, // your labels array
        datasets: [
          {
            data: this.dataPoints, // your data array
            backgroundColor: ['#003554', '#005279', '#00AEFF'],
            borderColor: 'transparent',
            borderWidth: 1,
            fill: false
          }
        ],
      },
      options: {
        animation: {
          animateRotate: true
        },
        tooltips: {
          bodyFontSize: 16
        },
        tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
        multiTooltipTemplate: "<%= value + ' %' %>",
        scaleLabel: true
      }
    });
  }

}
