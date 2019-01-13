var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {

    printnavbar();

    //Initialization
    $scope.obj = {};
    $scope.queueNumber = 0;
    $scope.estNumber = 0;
    $scope.foundPerson = false;
    var userid = localStorage.getItem('userid');

    var results;
    var data = { "userid": userid };
    var interval = 1000;
    setInterval(
        function () {
            console.log("Init()");
            var url = serverURL() + "/generalget.php";

            $.ajax({
                url: url,
                type: 'GET',
                data: '',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    console.log(arr);
                    console.log(arr.length);
                    $scope.queueNumber = arr.length;

                    $scope.$apply();
                    results = arr;
                },
                error: function () {
                    return;
                }
            });

            var url = serverURL() + "/getAppointment.php";

            $.ajax({
                url: url,
                type: 'GET',
                data: '',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    for (var x in arr) {
                        console.log(arr[x])
                        console.log(arr[x].name)
                        console.log(userid)
                        if (arr[x].name == userid) {
                            if (arr[x].bookingStatus == 1) {
                                $scope.confirmedBooking = "Confirmed"
                            }
                            else {
                                $scope.confirmedBooking = "Not Confirmed";
                            }
                            
                        }
                    }

                    $scope.$apply();
                },
                error: function () {
                    return;
                }
            });

            $scope.estNumber = filterResults(results, userid, "userid");
            $scope.$apply();
        }, interval);

    var filterResults = function (results, target, field) {
        var found = false;
        for (var i = 0; i < results.length; i++) {
            if (results[i][field] === target) {
                $scope.res = [results[i]];
                found = true;
                $scope.foundPerson = true;
                return i;
            }
        }
        return "You are currently not a registered patient with True Medical Clinic. Please register before joining the queue.";
    }

    $scope.btnRegisterQueue = function () {
        if ($scope.foundPerson) {
            alert("You are a current registered patient with True Medical Clinic.");
        }
        else {
            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth() + 1) + "-"
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
            var data = {
                "userid": localStorage.getItem('userid'),
                "status": 1,
                "datetime": datetime
            };

            var url = serverURL() + "/generalupdate.php";


            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    alert("You have been added into the queue system.");
                },
                error: function () {
                    return;
                }
            });
        }
        //window.location.href = "homepage.html";
    }
});