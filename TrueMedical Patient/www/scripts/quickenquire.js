

var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {
    printnavbar();

    $scope.name = "";
    $scope.email = "";
    $scope.phoneNo = "";
    $scope.enquiry = "";
    $scope.btnEnquire3 = function () {
        var data = {
            "name": $scope.name,
            "email": $scope.email,
            "phoneNo": $scope.phoneNo,
            "enquiry": $scope.enquiry
        };
        
        var url = serverURL() + "/enquire.php";

        var checkCorrectness = function () {
            if ($scope.name == "" || $scope.name == undefined) {
                alert("Name is empty");
                return false;
            }
            if ($scope.email == "" || $scope.email == undefined) {
                alert("Email is empty");
                return false;
            }
            if ($scope.phoneNo == "" || $scope.phoneNo == undefined) {
                alert("Phone Number is empty");
                return false;
            }
            if ($scope.enquiry == "" || $scope.enquiry == undefined) {
                alert("Enquiry is empty");
                return false;
            }
            return true;
        }

        if (checkCorrectness()) {
            /*$.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    alert("Your query is sent");
                },
                error: function (arr) {
                    alert("Your query is sent");
                }
            });
            */
            httpGet(url, data);
            alert("Query sent!");
        }
        function httpGet(theUrl, data) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl + "?name=" + data.name + "&email=" + data.email + "&phoneNo=" + data.phoneNo + "&enquiry=" + data.enquiry, false); // false for synchronous request
            xmlHttp.send(null);
            return xmlHttp.responseText;
        }

       
        
    }
    
});