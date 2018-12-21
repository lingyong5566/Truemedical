$(document).on("pagebeforecreate", function () {
    printnavbar();
});

var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {
    $scope.btnEnquire = function () {
        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "phoneNo": $scope.phoneNo,
            "enquiry": $scope.enquiry
        };
        
        var url = serverURL() + "/enquire.php";
        
        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                return;
            },
            error: function () {
                return;
            }
        });
        window.location.href = "homepage.html";
    }
    
});