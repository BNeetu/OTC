import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexYAxis, ApexFill, ApexTooltip } from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any;
  dataLabels: any; 
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {

  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Price (MWH)",
          type:'column',
          data: [
           2331216,
                7102800,
                7081992,
                4840560,
                3393888,
                2904672,
                2753280,
                2173896,
                978480,
                978360,
                978360,
                31464
          ],
        },
        {
          name: "Price (Rs.)",
          type:"line",
          color:'#0000ff',
          data: [
            6.99,
            8.06,
            7.94,
            7.29,
            6.85,
            6.72,
            6.86,
            7,
            6.21,
            6.31,
            6.31,
            6.32
          ],
        }
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      stroke:{
        width: [0,4],
      },
      dataLabels:{
        enabled:true,
        enabledOnSeries:[1]
      },
      xaxis: {
        categories: [
          "Mar-24",
          "Apr-24",
          "May-24",
          "Jun-24",
          "Jul-24",
          "Aug-24",
          "Sep-24",
          "Oct-24",
          "Nov-24",
          "Dec-24",
          "Jan-25",
          "Feb-25"
        ]
      },
      yaxis: [
        {
          title: {
            text: "Volume (MWh)"
          }
        },
        {
          opposite: true,
          title: {
            text: "Price (Rs.)"
          }
        }
      ],
    }
  }
}
