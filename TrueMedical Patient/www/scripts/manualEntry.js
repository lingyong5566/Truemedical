$(document).on("pagebeforecreate", function () {
    printnavbar();
});

var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {

    //Initialization
    $scope.obj = {};
    $scope.obj.name = "Kiev Ooi Bin Hao";
    $scope.obj.nric = "S9812345J";
    $scope.obj.mobileNo = "92809281";
    $scope.obj.homeAdd = "21 Tampines Ave 1, Singapore 529757";
    $scope.obj.marital = "Single";
    $scope.obj.sex = "Male";
    $scope.obj.nationality = "Singaporean";
    $scope.obj.food_allergies = "None";
    $scope.obj.drug_allergies = "None";

    //For conversion only
    var months = {
        "Jan" : "01",
        "Feb" : "02",
        "Mar" : "03",
        "Apr" : "04",
        "May" : "05",
        "Jun" : "06",
        "Jul" : "07",
        "Aug" : "08",
        "Sep" : "09",
        "Oct" : "10",
        "Nov" : "11",
        "Dec" : "12"}
    
    

    //Variables
    var name;
    var nric;
    var mobileNo;
    var homeAdd;
    var DOB;


    //Angular function call
    $scope.btnRegister = function () {
        dobSplitString = String($scope.obj.dob).split(" ")

        //Data for patient
        var data = {
            "name": $scope.obj.name,
            "nric": $scope.obj.nric,
            "dob": dobSplitString[3] + '-' + months[dobSplitString[1]] + '-' + dobSplitString[2],
            "allergies_select": "Yes",
            "allergies": $scope.obj.drug_allergies,
            "food_allergies_select": "Yes",
            "food_allergies": $scope.obj.food_allergies,
            "marital_status": $scope.obj.marital,
            "sex": $scope.obj.sex,
            "nationality": $scope.obj.nationality,
            "telephone": $scope.obj.mobileNo,
            "address": $scope.obj.homeAdd
        };


        console.log(dobSplitString[3] + '-' + months[dobSplitString[1]] + '-' + dobSplitString[2]);
        var url = "https://api2.platomedical.com/drianchen_test/patient"; // Url for api
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
            method: "POST",
            data: data,
            headers: header
        }).then(function (response) {
                console.log(response);
                $scope.patientInfo = response.data;
                registerFirstTimer();
                //console.log("$scope.patientInfo : ", $scope.patientInfo[0].result);

            });

    }

    



    function validateNRIC() {
        var phoneNumber = $("#textNRIC").val();
        var phoneRGEX = /[A-Z]\d{7}[A-Z]/;
        var phoneResult = phoneRGEX.test(phoneNumber);
        if (phoneResult) {
            return true;
        }
        else {
            alert("NRIC format is incorrect.");
            return false;
        }


    }



    function validatePhone() {
        var phoneNumber = $("#txtMobileNo").val();
        var phoneRGEX = /\d{8}/;
        var phoneResult = phoneRGEX.test(phoneNumber);
        if (phoneResult) {
            return true;
        }
        else {
            alert("Phone format is incorrect.");
            return false;
        }


    }

    $(document).ready(function () {

        $.validator.addMethod(
            "regex",
            function (value, element, regexp) {
                var re = new RegExp(regexp);
                alert(this.optional(element))
                alert(re.test(value));
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );





        $("#NewPatientForm").validate({
            rules: {
                txtNRIC: {
                    required: true,
                    regex: /^[A - Z]\d{7}[A - Z]/
                }
            },
            messages: {
                txtName: "name is required",
                txtNRIC: {
                    required: "nric is required",
                    regex: "regex"
                },
                txtMobileNo: "mobile number is required",
                txtHomeAdd: "home address is required",
                txtDOB: "DOB is required"
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            }
        });

        //Input data into database
        $("#btnRegister").bind("click", function () {

            if ($("#NewPatientForm").valid()) {
                if (validateNRIC() && validatePhone()) {
                    //registerFirstTimer();
                }

            }
            else {
                return;
            }


        });

    });

    function registerFirstTimer() {
        
        name = $("#txtName").val();
        nric = $("#textNRIC").val();
        mobileNo = $("#txtMobileNo").val();
        homeAdd = $("#txtHomeAdd").val();
        DOB = $("#txtDOB").val();

        var data = {
            "name": $scope.obj.name,
            "nric": $scope.obj.nric,
            "dob": dobSplitString[3] + '-' + months[dobSplitString[1]] + '-' + dobSplitString[2],
            "allergies_select": "Yes",
            "allergies": $scope.obj.drug_allergies,
            "food_allergies_select": "Yes",
            "food_allergies": $scope.obj.food_allergies,
            "marital_status": $scope.obj.marital,
            "sex": $scope.obj.sex,
            "nationality": $scope.obj.nationality,
            "mobileNo": $scope.obj.mobileNo,
            "homeAdd": $scope.obj.homeAdd,
            "userid": localStorage.getItem('userid')
        };

        var url = serverURL() + "/newpatient.php";


        //we validate again
        if (_validate()) {

            //provide these parameters
            var JSONObject = {
                "name": name,
                "nric": nric,
                "mobileNo": mobileNo,
                "homeAdd": homeAdd,
                "DOB": DOB,
                "userid": localStorage.getItem('userid')
            };
            $.ajax({
                url: url,
                type: 'GET',
                data: data,
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                success: function (arr) {
                    alert("successful registration");
                    return;
                },
                error: function (xhr, textStatus, errorThrown) {
                    return;
                }
            });

        }
        alert("successful registration");
        window.location = "homepage.html";
    }


    function _validate() {
        var validate = true;
        return validate;
    }
});