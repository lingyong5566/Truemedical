$(document).on("pagebeforecreate", function () {
    printnavbar();
});

var app = angular.module('myApp', []);
app.controller('getPatientCtrl', function ($scope, $http) {

    $scope.res = "";
    $scope.obj2 = {};

    $scope.btnGetPatient = function () {

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

    var loadResult = function () {
        $scope.obj2.name = $scope.res[0].name;
        $scope.obj2.dob = $scope.res[0].dob;
        $scope.obj2.allergies_select = $scope.res[0].allergies_select;
        $scope.obj2.allergies = $scope.res[0].allergies;
        $scope.obj2.food_allergies_select = $scope.res[0].food_allergies_select;
        $scope.obj2.marital = $scope.res[0].marital_status;
        $scope.obj2.sex = $scope.res[0].sex;
        $scope.obj2.nationality = $scope.res[0].nationality;
        $scope.obj2.mobileNo = $scope.res[0].mobileNo;
        $scope.obj2.homeAdd = $scope.res[0].homeAdd;
        $scope.boolRes = true;
        $scope.$apply();
        console.log(" $scope.obj2 : ", $scope.obj2);
    }
    

    $scope.dataFilter = function (dataNumber) {
        $scope.boolRes = true;
        res = $scope.results[dataNumber - 1 ];
        $scope.name = res["name"];
        $scope.email = res["email"];
        $scope.phoneNo = res["phoneNo"];
        $scope.enquiry = res["enquiry"];
    }
    
    
});