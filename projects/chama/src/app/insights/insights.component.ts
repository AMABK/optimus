import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AddGroupDetailsComponent } from '../home/add-group-details/add-group-details.component';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  @ViewChild('lineChart', { static: true }) private chartRef;
  chart: any;
  LineChart: any = [];
  public pieChartLabels: string[] = [
    'Pending',
    'InProgress',
    'OnHold',
    'Complete',
    'Cancelled'
  ];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType = 'pie';
  public pieChartOptions: any = {
    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
  };
  constructor() {}

  ngOnInit() {
    
  }
  ngAfterViewInit() {
    // Line chart:
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'March',
          'April',
          'May',
          'June',
          'July',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        datasets: [
          {
            label: 'Total contributions(KES)',
            data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
            fill: false,
            lineTension: 0.2,
            borderColor: 'red',
            borderWidth: 1
          },
          {
            label: 'Total saving(KES)',
            data: [0, 7, 3, 4, 2, 18, 5, 16, 1, 3, 1, 9],
            fill: false,
            lineTension: 0.2,
            borderColor: 'green',
            borderWidth: 1
          },
          {
            label: 'Other Ccontributions(KES)',
            data: [8, 6, 3, 9, 2, 10, 15, 16, 19, 9, 1, 0],
            fill: false,
            lineTension: 0.2,
            borderColor: 'blue',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
          text: 'Line Chart',
          display: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
