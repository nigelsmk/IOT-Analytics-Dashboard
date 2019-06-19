import { COLORS } from '../../constants/colors';
import * as $ from 'jquery';
import Chart from 'chart.js';

export const getRandomRgb = () => {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

export const json2table = (json, classes) => {
    var cols = Object.keys(json[0]);

    var headerRow = '';
    var bodyRows = '';

    classes = classes || '';

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    cols.map(function (col) {
        headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
    });

    json.map(function (row) {
        bodyRows += '<tr>';

        cols.map(function (colName) {
            bodyRows += '<td>' + row[colName] + '</td>';
        })

        bodyRows += '</tr>';
    });

    return '<table class="' +
        classes +
        '"><thead><tr>' +
        headerRow +
        '</tr></thead><tbody>' +
        bodyRows +
        '</tbody></table>';
}

export const addData = (chart, labels, data) => {
    //console.log('labels: ' + labels);
    //console.log('data: ' + data);
    chart.data.labels = labels;
    chart.data.datasets = data;
    chart.update();
}

export const removeData = (chart) => {
    chart.data.labels = [];

    chart.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
    chart.update();
}
