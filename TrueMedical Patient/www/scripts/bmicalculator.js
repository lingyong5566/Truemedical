$(document).on("pagebeforecreate", function () {
    printnavbar();
});


var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {
    $scope.bmi = 0;
    $scope.btnCalc = function () {
        $scope.bmi = parseFloat($scope.weight / (($scope.height / 100) * ($scope.height / 100))).toFixed(2);
        //theChart.series[0].data = getData(parseInt($scope.bmi));
        if ($scope.bmi < 18.5) {
            $scope.results = "You have a high risk of nutritional deficiency";
        }
        else if ($scope.bmi < 23) {
            $scope.results = "You are at low risk";
        }
        else if ($scope.bmi < 30) {
            $scope.results = "You are at moderate risk";
        }
        else if ($scope.bmi < 100) {
            $scope.results = 'You are at high risk'
        }
        else {
            $scope.results = "Please input a valid height and weight";
        }
        option.series[0] = {
            data: [{ y: parseInt($scope.bmi), color: 'blue' }],
            dataLabels: {
                enabled: false
            },
            yAxis: 0,
            dial: {
                backgroundColor: 'blue'
            }
        };
        console.log("option.subtitle : ", option.subtitle)
        option.subtitle = {
            text: "BMI : " + $scope.bmi,
                style: {
                'font-size': '20px'
            },
            y: 200,
                zIndex: 7
        }
        theChart = Highcharts.chart('container', option);
        console.log("theChart : ", theChart)
    };
    

    var rawData = 0,
        data = getData(rawData);

    function getData(rawData) {
        var data = [],
            start = Math.round(Math.floor(rawData / 10) * 10);
        data.push(rawData);
        for (i = start; i > 0; i -= 10) {
            data.push({
                y: i
            });
        }
        return data;
    }

    var option = {
        chart: {
            type: 'solidgauge',
            backgroundColor: "#B1D8DB",
            marginTop: 10
        },

        title: {
            text: ''
        },

        subtitle: {
            text: "BMI : " + $scope.bmi,
            style: {
                'font-size': '20px'
            },
            y: 200,
            zIndex: 7
        },

        tooltip: {
            enabled: false
        },

        pane: [{
            startAngle: -120,
            endAngle: 120,
            background: [{ // Track for Move
                outerRadius: '100%',
                innerRadius: '80%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                borderWidth: 0,
                shape: 'arc'
            }],
            size: '120%',
            center: ['50%', '65%']
        }, {
            startAngle: -120,
            endAngle: 120,
            size: '95%',
            center: ['50%', '65%'],
            background: []
        }],

        yAxis: [{
            min: 15,
            max: 30,
            lineWidth: 2,
            lineColor: 'white',
            tickInterval: 6,
            labels: {
                enabled: false
            },
            minorTickWidth: 0,
            tickLength: 50,
            tickWidth: 5,
            tickColor: 'white',
            zIndex: 6,
            stops: [
                [0, '#f06'],
                [0.333, '#4b0'],
                [0.666, '#d0f'],
                [1, '#f06']
            ]
        }, {
            linkedTo: 0,
            pane: 1,
            lineWidth: 5,
            lineColor: 'white',
            tickPositions: [],
            zIndex: 6
        }],

        series: [{
            data: [{ y: 0, color: 'red' }],
            yAxis: 0,
            dataLabels: {
                enabled: false
            },
            dial: {
                backgroundColor: 'red'
            }
        }]
    };
    var theChart = Highcharts.chart('container', option);
    
});