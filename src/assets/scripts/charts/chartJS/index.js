import Chart from 'chart.js';
import { COLORS } from '../../constants/colors';
import * as $ from 'jquery';
import { getFootTrafficLocation, getFootTrafficForPast7Days, getAgeRange, getPromoCodeUsage } from './getData.js'
import { getRandomRgb, json2table, addData, removeData } from './utils.js'

export default (function () {

  const lineChartBox = document.getElementById('line-chart');

  if (lineChartBox) {
    const lineCtx = lineChartBox.getContext('2d');
    lineChartBox.height = 180;

    var datasetsContents = getFootTrafficLocation();
    console.log('before');
    console.log(datasetsContents);

    var locationTrafficLineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'],
        datasets: datasetsContents
      },

      options: {
        legend: {
          position: 'bottom',
        },
      },

    });
  }

  const barChartBox = document.getElementById('bar-chart');

  if (barChartBox) {
    const barCtx = barChartBox.getContext('2d');

    var results = getFootTrafficForPast7Days();

    var daysTrafficBarChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: results[0],
        datasets: results[1]
      },

      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      },
    });
  }

  const timeSpentBarChartBox = document.getElementById('time-spent-bar-chart');

  if (timeSpentBarChartBox) {

    const xlabels = [];
    const datasetsContents = [];

    const timeSpentBarCtx = timeSpentBarChartBox.getContext('2d');

    const timeSpentData = { "location1": 18, "location2": 21, "location3": 6 }

    var numLocations = Object.keys(timeSpentData).length;

    for (var key in timeSpentData) {
      xlabels.push(key);
      const value = timeSpentData[key];
    }

    var timeSpentMinutes = [];

    for (var key in timeSpentData) {
      const value = timeSpentData[key];
      timeSpentMinutes.push(value);
    }

    const randomColor = getRandomRgb();

    const datasetObject = {
      label: 'minutes',
      backgroundColor: randomColor,
      borderColor: randomColor,
      borderWidth: 1,
      data: timeSpentMinutes
    }

    datasetsContents.push(datasetObject);

    var timeSpentBarChart = new Chart(timeSpentBarCtx, {
      type: 'bar',
      data: {
        labels: xlabels,
        datasets: datasetsContents
      },

      options: {
        responsive: true,
        legend: {
          position: 'bottom',
        },
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      },
    });

  }

  const horizontalBarChartBox = document.getElementById('horizontal-bar-chart');

  if (horizontalBarChartBox) {
    const horizontalBarCtx = horizontalBarChartBox.getContext('2d');

    var results = getAgeRange();
    //console.log(results);

    var ageBarChart = new Chart(horizontalBarCtx, {
      type: 'horizontalBar',
      data: {
        labels: results[0],
        datasets: [{
          label: "Age in years",
          backgroundColor: COLORS['blue-500'],
          borderColor: COLORS['blue-800'],
          borderWidth: 1,
          data: results[1],
        }],
      },

      options: {
        responsive: true,
        legend: {
          display: 'false',
        }
      },
    });
  }

  const pieChart = document.getElementById('pie-chart');
  const ctx = pieChart.getContext('2d');

  if (pieChart) {
    var results = getPromoCodeUsage();
    // console.log('before');
    // console.log(results[1]);

    var categoryPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: results[1],
        labels: results[0]
      }
    });
  }

  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'http://localhost:8080/api/getAllPromoCode', true);

  request.onload = function () {
    // Begin accessing JSON data here
    const returnedJSONpromoTable = JSON.parse(this.response);
    document.getElementById('promoCodeTable').innerHTML = json2table(returnedJSONpromoTable, 'table');
  }

  // Send request
  request.send();

  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', 'http://localhost:8080/api/getDetails', true);

  request.onload = function () {
    // Begin accessing JSON data here
    var returnedJSONgameDetailsTable = JSON.parse("[" + this.response + "]");

    document.getElementById('gameDetailsTable').innerHTML = json2table(returnedJSONgameDetailsTable, 'table');
  }

  // Send request
  request.send();

  // document.getElementById("updateData-btn").onclick = function () {
  //   removeData(locationTrafficLineChart);
  //   // removeData(daysTrafficBarChart);
  //   // removeData(timeSpentBarChart);
  //   // removeData(ageBarChart);    
  //   //removeData(categoryPieChart);

  //   var datasetsContents = getFootTrafficLocation();
  //   console.log('after');
  //   console.log(datasetsContents);

  //   addData(locationTrafficLineChart, ['11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'], datasetsContents);

  //   // var bgColors = [];
  //   // var datasetsContents = [];

  //   // for (var i = 0; i < 4; i++) {
  //   //   var randomColor = getRandomRgb()
  //   //   bgColors.push(randomColor);
  //   // }

  //   // var datasetObject = {
  //   //   backgroundColor: bgColors,
  //   //   data: [9, 2, 11, 23]
  //   // }

  //   // //console.log('datasetObject: ' + datasetObject);

  //   // datasetsContents.push(datasetObject);

  //   // console.log(datasetsContents);
  //   // addData(categoryPieChart, ['beauty', 'children', 'fashion', 'food'], datasetsContents);
  // };

}())
