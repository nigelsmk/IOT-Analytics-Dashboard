import { COLORS } from '../../constants/colors';
import * as $ from 'jquery';
import { getRandomRgb, json2table } from './utils.js'
import Chart from 'chart.js';

export const getFootTrafficLocation = () => {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8080/api/getFootTrafficlocation', true);

    var numLocations = 0;
    const datasetsContents = [];

    request.onload = function () {
        //const fakeData = '{"1":[20,20,20,20,20,30,20,20,20,19,20],"2":[13,15,19,22,18,18,20,19,17,25,15],"3":[27,22,17,19,22,12,21,15,23,13,25]}';
        const returnedJSON = JSON.parse(this.response);

        numLocations = Object.keys(returnedJSON).length;

        for (var key in returnedJSON) {
            const value = returnedJSON[key];
        }

        for (var i = 1; i <= numLocations; i++) {
            const randomColor = getRandomRgb()

            const datasetObject = {
                label: 'Location ' + i,
                //backgroundColor: randomColor,
                borderColor: randomColor,
                borderWidth: 1,
                data: []
            }

            datasetsContents.push(datasetObject);
        }



        var count = 0;
        for (var key in returnedJSON) {
            const value = returnedJSON[key];

            for (var x = 0; x < value.length; x++) {
                datasetsContents[count]['data'].push(value[x]);
            }
            count++;
        }

    }

    request.send();

    return datasetsContents;
}

export const getFootTrafficForPast7Days = () => {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8080/api/getFootTrafficForPast7Days', true);

    var numLocations = 0;
    const xlabels = [];
    const datasetsContents = [];
    var locations = '';
    var actionInsight = '';

    request.onload = function () {
        const returnedJSON = JSON.parse(this.response);

        const numObjects = Object.keys(returnedJSON).length;
        var counter = 0;
        for (var key in returnedJSON) {
            if (counter == (numObjects - 2)) {
                locations = key;

                delete returnedJSON[key];
            }

            if (counter == (numObjects - 1)) {
                var indexOfPeriod = key.indexOf('.');
                actionInsight = key.substring(0, indexOfPeriod + 1);
                var suggestion = key.substring(indexOfPeriod + 1, key.length);

                document.getElementById('dailyTraffic-insight').innerHTML = 'Insight: ' + actionInsight + '</br></br>' + suggestion;
                delete returnedJSON[key];
            }

            counter++;
        }

        var commaCounter = 0;
        var locationArray = [];
        var locationString = [];

        for (var l = 0; l < locations.length; l++) {

            var letter = locations[l];
            locationString += letter;

            if (letter == ',') {
                commaCounter++;
            }

            if (commaCounter != 0 && commaCounter % 2 == 0) {

                if (locationString[locationString.length - 1] == ',') {
                    locationString = locationString.substring(0, locationString.length - 1);
                }

                locationArray.push(locationString);
                locationString = '';
                commaCounter = 0;
            }

        }

        var myTable = "<tr><td style='width: 100px;'>Location Number</td>";
        myTable += "<td style='width: 100px;'>Description</td>";

        for (var i = 0; i < 3; i++) {

            myTable += "<tr><td style='width: 100px;'>" + (i + 1) + "</td>";
            myTable += "<td style='width: 100px;'>" + locationArray[i] + "</td></tr>";
        }

        document.getElementById('tablePrint').innerHTML = myTable;

        for (var key in returnedJSON) {
            var indexOfSpace = key.indexOf(' ');
            var day = key.substring(indexOfSpace + 1, (key.length));

            xlabels.push(day);
            const value = returnedJSON[key];
            numLocations = value.length;
        }

        for (var i = 1; i <= numLocations; i++) {
            const randomColor = getRandomRgb()

            const datasetObject = {
                label: 'Location ' + i,
                backgroundColor: randomColor,
                borderColor: randomColor,
                borderWidth: 1,
                data: []
            }

            datasetsContents.push(datasetObject);
        }

        for (var key in returnedJSON) {
            const value = returnedJSON[key];

            for (var x = 0; x < value.length; x++) {
                datasetsContents[x]['data'].push(value[x]);
            }

        }
    }

    // Send request
    request.send();

    return [xlabels, datasetsContents];
}

export const getAgeRange = () => {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8080/api/getAgeRange', true);

    const xlabels = [];
    const dataCounts = [];

    request.onload = function () {
        const returnedJSON = JSON.parse(this.response);

        for (var key in returnedJSON) {
            xlabels.push(key);
            const value = returnedJSON[key];
            dataCounts.push(value);
        }
    }

    request.send();

    return [xlabels, dataCounts];
}

export const getPromoCodeUsage = () => {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://localhost:8080/api/getPromoCodeUsage', true);

    var numCategories = 0;
    var insight = '';
    var categoryLabels = [];
    var datasetsContents = [];

    request.onload = function () {
        const returnedJSON = JSON.parse(this.response);

        for (var key in returnedJSON) {
            const value = returnedJSON[key];

            if (value == 0) {
                var indexOfPeriod = key.indexOf('.');
                insight = key.substring(1, indexOfPeriod + 1);
                var suggestion = key.substring(indexOfPeriod + 1, key.length);

                document.getElementById('pie-insight').innerHTML = 'Insight: ' + insight + '</br></br>' + suggestion;
                delete returnedJSON[key];
            }
        }

        numCategories = Object.keys(returnedJSON).length;

        const categoryValues = [];

        for (var key in returnedJSON) {
            categoryLabels.push(key);

            const value = returnedJSON[key];

            categoryValues.push(value);
        }

        const backgroundColors = [];

        for (var i = 0; i < numCategories; i++) {
            const randomColor = getRandomRgb()
            backgroundColors.push(randomColor);
        }

        var datasetObject = {
            backgroundColor: backgroundColors,
            data: categoryValues
        }

        datasetsContents.push(datasetObject);
    }

    request.send();

    //console.log(datasetsContents);

    return [categoryLabels, datasetsContents];
}