
var app = angular.module('myApp', []);
app.controller('getPatientCtrl', function ($scope, $http) {

    $scope.res = "";
    $scope.obj = {};
    $scope.patientInfo = [];
    $scope.btnGetPatientPHP = function () {

        var url = serverURL() + "/getpatientbyid.php";

      

        $.ajax({
            url: url,
            type: 'GET',
            data: {
                nric: $scope.obj.nric
            },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                console.log(arr);
                $scope.res = arr;
                loadResult();
            },
            error: function () {
                $scope.boolRes = false;
                alert("No results found");
            }
        });

    }

   

    $scope.btnGetPatient = function (pageNumber) {
        var data = {
        };

        
        var url = "https://api2.platomedical.com/drianchen_test/patient"; // Url for api

        url = url + "?current_page=" + pageNumber;
        console.log("data : ", data);
        //Header for http call
        var header = {
            "accept": "application/json",
            "Authorization": "Bearer 77d952a831454b1ea69b5daed337aafd",
            "Content-Type": "application/json"

        }

        //HTTP CALL
        $http({
            url: url,
            method: "GET",
            data: {},
            headers: header
        }).then(function (response) {

            if (response.data.length != 0) {
                for (var i = 0; i < response.data.length; i++) {
                    $scope.patientInfo.push(response.data[i]);
                }
                
                $scope.btnGetPatient(parseInt(pageNumber) + 1);
                console.log("$scope.patientInfo : ", $scope.patientInfo);
            }
            else {
                filterResults();
            }
            
            

        });
    }

    var filterResults = function () {
        var found = false;
        for (var i = 0; i < $scope.patientInfo.length; i++) {
            if ($scope.patientInfo[i].nric == $scope.obj.nric) {
                $scope.res = [$scope.patientInfo[i]];
                loadResult();
                found = true;
            }
        }
        if (!found) {
            alert("IC number cannot be found on plato database.");
        }
    }

    var loadResult = function () {
        $scope.obj.name = $scope.res[0].name;
        $scope.obj.dob = $scope.res[0].dob;
        $scope.obj.allergies_select = $scope.res[0].allergies_select;
        $scope.obj.allergies = $scope.res[0].allergies;
        $scope.obj.food_allergies = $scope.res[0].food_allergies;
        $scope.obj.food_allergies_select = $scope.res[0].food_allergies_select;
        $scope.obj.marital = $scope.res[0].marital_status;
        $scope.obj.sex = $scope.res[0].sex;
        $scope.obj.nationality = $scope.res[0].nationality;
        $scope.obj.mobileNo = $scope.res[0].telephone;
        $scope.obj.homeAdd = $scope.res[0].address;
        $scope.boolRes = true;
        $scope.$apply();
        console.log(" $scope.obj : ", $scope.obj);
    }
    

    $scope.dataFilter = function (dataNumber) {
        $scope.boolRes = true;
        res = $scope.results[dataNumber - 1 ];
        $scope.name = res["name"];
        $scope.email = res["email"];
        $scope.phoneNo = res["phoneNo"];
        $scope.enquiry = res["enquiry"];
    }

    $scope.btnRegister = function () {
        var data = {
            "name": $scope.obj.name,
            "nric": $scope.obj.nric,
            "allergies_select": "Yes",
            "allergies": $scope.obj.allergies,
            "food_allergies_select": "Yes",
            "food_allergies": $scope.obj.food_allergies,
            "marital_status": $scope.obj.marital,
            "sex": $scope.obj.sex,
            "nationality": $scope.obj.nationality,
            "mobileNo": $scope.obj.mobileNo,
            "homeAdd": $scope.obj.homeAdd,
            "dob": $scope.obj.dob,
            "userid": localStorage.getItem('userid')
        };

        var url = serverURL() + "/newpatient.php";
        

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
        alert("successful registration");
        window.location.href = "homepage.html";
    }
    
    
});