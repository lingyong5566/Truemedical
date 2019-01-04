
var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {

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

    var interval = 1000;
    setInterval(
        function () {
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
        }, interval);
    
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

        var url = serverURL() + "/chatSend.php";


        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
               
            },
            error: function () {
            }
        });
        $scope.init();
        $scope.details = "";
        //window.location.href = "homepage.html";
    }
});