
var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {

    printnavbar();
    //Initialization
    $scope.messages = [];
    $scope.toWho = "";
    $scope.oUser = localStorage.getItem('userid') == "admin";
    var userid = localStorage.getItem('userid');
    
    var filterResults = function (results,target,field) {
        var found = false;
        for (var i = 0; i < results.length; i++) {
            if (results[i][field] == target) {
                $scope.res = [results[i]];
                return i;
                found = true;
            }
        }
    }

    

    $scope.init = function () {
        req();
    }

    var interval = 1000;

    var req = function () {
        var data = {
            "userid": userid
        };

        var url = serverURL() + "/chatGet.php";


        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                $scope.messages = arr;
                console.log("Messages received : ", arr);

                var url2 = serverURL() + "/chatGetOwn.php";


                $.ajax({
                    url: url2,
                    type: 'GET',
                    data: data,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function (arr) {
                        for (var x in arr) {
                            $scope.messages.push(arr[x]);
                        }

                        console.log("Messages sent : ", arr);
                        $scope.messages.sort(function (a, b) {
                            return a.messageId - b.messageId
                        })
                        console.log("Order : ", $scope.messages);
                        $scope.$apply();

                        setTimeout(req, interval);

                    },
                    error: function (err) {
                        console.log(err);
                        return;
                    }
                });
            },
            error: function (err) {
                console.log(err);
                return;
            }
        });
    }

    function httpGet(theUrl,data) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", theUrl + "?fromWho=" + data.fromWho + "&details=" + data.details + "&toWho=" + data.toWho, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    $scope.sendChat = function () {
        var data = {
            "fromWho": localStorage.getItem('userid'),
            "details": $scope.details
        };

        if (localStorage.getItem('userid') != "admin") {
            data["toWho"] = "admin";
        }
        else {
            data["toWho"] = $scope.toWho;
        }

        

        var url5 = serverURL() + "/chatSend.php";
        
        httpGet(url5, data);
        $scope.details = "";
       /* $.ajax({
            url: url5,
            type: 'GET',
            data: data,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                $scope.details = "";
            },
            error: function (err) {
                console.log(err)
                $scope.details = "";
            }
        });*/
        //window.location.href = "homepage.html";
    }
});