

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


        if (checkCorrectness()) {
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    alert("Your query is sent");
                    return;
                },
                error: function (arr) {
                    alert("Your query is sent");
                    return;
                }
            });
        }
        

        var checkCorrectness = function () {
            if ($scope.name == "") {
                alert("Name is empty");
                return false;
            }
            if ($scope.email == "") {
                alert("Email is empty");
                return false;
            }
            if ($scope.phoneNo == "") {
                alert("Phone Number is empty");
                return false;
            }
            if ($scope.enquiry == "") {
                alert("Enquiry is empty");
                return false;
            }
            return true;
        }
        
    }
    
});