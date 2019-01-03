var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {

    $scope.results = "";
    $scope.modResults = "";
    $scope.users = [];
    $scope.init = function () {
        console.log("Init()");
        var url = serverURL() + "/adminblacklist.php";

        $.ajax({
            url: url,
            type: 'GET',
            data: '',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                console.log(arr);
                $scope.$apply();

                var url2 = serverURL() + "/admingetuser.php";

                $.ajax({
                    url: url2 ,
                    type: 'GET',
                    data: '',
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function (arr) {
                        console.log(arr);
                        $scope.users = arr;
                        $scope.$apply();
                    },
                    error: function () {
                        return;
                    }
                });
            },
            error: function () {
                return;
            }
        });

        

        
        //alert("You have received an enquiry!");
    }

    var modRes = function () {
        for (var x = 0; x < $scope.results.length; x++) {
            if ($scope.results[x].status == 1) {
                $scope.results[x].modStatus = "In Queue";
            }
            else {
                $scope.results[x].modStatus = "Checked In";
            }
        }
        $scope.modResults = $scope.results;
        $scope.$apply();
    }

    $scope.updateValue = function (x) {
        console.log("updateValue called");
        console.log(x);

        var userid = localStorage.getItem('userid');

        var data = {
            "userid": x.userid
        };

        var url = serverURL() + "/qrstatusupdate.php";


        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                alert("status updated");
                $scope.init();
            },
            error: function () {
                $scope.init();
                return;
            }
        });
    }

    $scope.deleteValue = function (x) {
        console.log("deleteValue called");
        console.log(x);

        var userid = localStorage.getItem('userid');

        var data = {
            "userid": x.userid
        };

        var url = serverURL() + "/qrstatusdelete.php";


        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                alert("status deleted");
                $scope.init();
            },
            error: function () {
                $scope.init();
                return;
            }
        });
    }


});