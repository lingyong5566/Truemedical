$(document).on("pagebeforecreate", function () {
    printnavbar();
});

var app = angular.module('myApp', []);
app.controller('apptCtrl', function ($scope, $http) {

    //Variables
    var date;
    var time;
    var email = localStorage.getItem("email");
    var name = localStorage.getItem("userid");
    var bookingStatus = 1;
    $(document).ready(function () {


        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear() + "-" + (month) + "-" + (day);

        $('#txtDate').val(today);
        $('#txtDate').attr('min', today);


        $("#NewPatientForm").validate({
            messages: {
                txtDate: "Date is required",
                txtTime: "Time is required"
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
        $("#btnRegister1").bind("click", function () {
            console.log($scope.theDate);
            var conflicted = false;
            if ($("#NewPatientForm").valid()) {
                console.log(checkDate($scope.theDate))
                console.log(checkTime($scope.theTime))
                if (checkDate($scope.theDate) && checkTime($scope.theTime)) 
                {
                    var callback = function (arr) {
                        console.log("appointments : ", arr);
                        
                        
                        for (var x = 0; x < arr.length; x++) {
                            console.log("$scope.theDate : ", $scope.theDate);
                            var toCompareDate = $scope.theDate.getFullYear() + "-" + $scope.theDate.getMonth() + 1 + "-" + $scope.theDate.getDate();
                            console.log(toCompareDate);
                            console.log(arr[x].date);
                            if (toCompareDate == arr[x].date) {
                                var bookedTime = $("#txtTime").val();        
                                bookedTime = bookedTime.split(":");
                                var splitTime = arr[x].time.split(":");
                                bookedTime = new Date(0, 0, 0, bookedTime[0], bookedTime[1]);
                                
                                var conflictTime = new Date(0, 0, 0, splitTime[0], splitTime[1], splitTime[2]);
                                var addedConflictTime = new Date(0, 0, 0, splitTime[0], splitTime[1], splitTime[2]);
                                addedConflictTime.setHours(addedConflictTime.getHours() + 1);

                                console.log("conflictTime <= bookedTime : ", conflictTime <= bookedTime)
                                console.log("bookedTime <= addedConflictTime : ", bookedTime <= addedConflictTime)
                                console.log(bookedTime)
                                console.log(conflictTime)
                                console.log(addedConflictTime)
                                if (conflictTime <= bookedTime && bookedTime <= addedConflictTime ) {
                                    alert("Conflicted with another appointment. Please choose another timing or another date");
                                    conflicted = true;
                                    return;
                                }
                                else {

                                }
                                //if($scope.theTime >)
                            }
                        }
                        if(!conflicted)
                            sendOTP();

                    }
                    doAJAXCall("/getAppointment.php", {} , callback , callback)
                    
                    
                }
                    
                else {
                    alert("Sorry, our clinic is open from 12pm to 6pm.");
                }
            }
            else {
                return;
            }

        });

    });

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
            $scope.blacklisted = arr;
            modRes();
        },
        error: function () {
            return;
        }
    });

    

    var modRes = function () {
        
        if (filterStyle(name, $scope.blacklisted).length > 0) {
            alert("YOU ARE BLACKLISTED");
            window.location = "homepage.html";
        }
        else {
        }
        /*if (!$scope.blacklisted.indexOf($scope.userss[x].userid)) {
            $scope.userss[x].modStatus = "Blacklisted";
        }
        else {
            $scope.userss[x].modStatus = "Not blacklisted";
        }*/
        $scope.$apply();
    }

    var filterStyle = function (styleSelected, data) {
        var wantedData = data.filter(function (i) {
            return i.userid == styleSelected;
        });
        return wantedData;
    }

    
    
    var checkDate = function (date) {
        var d1 = new Date();
        var d2 = new Date(date);
        console.log(d1.getDate() + 1)
        console.log(d2.getDate())
        console.log(d1.getDate() + 1 <= d2.getDate())
        if (d1.getDate() + 1 <= d2.getDate()) {
            return true;
        }
        else
            return false;
    }

    var checkTime = function (time) {
        var d2 = new Date(time);
        console.log(d2);
        console.log(d2.getHours());
        if ((d2.getHours() > 7 && d2.getHours() < 14) || (d2.getHours() > 17 && d2.getHours() < 23)) {
            return true;
        }
        else
            return false;
    }
    function sendOTP() {
        var url = serverURL() + "/sendEmail.php";
        date = $("#txtDate").val();
        time = $("#txtTime").val();
        name = localStorage.getItem("userid");
        console.log(date);
        email = localStorage.getItem("email");
        var otp = Math.floor(Math.random() * 90000) + 10000;
        $.ajax({
            url: url,
            type: 'GET',
            data: { "date": date, "time": time, "otp": otp.toString(), "email": email },
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });
        localStorage.setItem("date", date); //save date into localstorage
        localStorage.setItem("time", time); //save time into localstorage
        sentOTP(otp.toString());
    }

    function sentOTP(otp) {
        var enterOTP = prompt("Please enter your OTP", "");
        if (enterOTP == otp) {
            alert("Your appointment has been made");
            // Make Appt
            // Route to Slide 18
            makeAppointment();
        }
        else {
            alert("OTP is wrong");
        }
    }

    function makeAppointment() {
        var url = serverURL() + "/makeAppointment2.php";
        date = $("#txtDate").val();
        time = $("#txtTime").val();
        var JSONObject = {
            "date": date,
            "time": time,
            "doctor": $scope.doctor,
            "details": $scope.details,
            "name": name,
            "email": email,
            "bookingStatus": 0
        };
        console.log(JSONObject);
        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (arr) {
                return;
            },
            error: function (err) {
                return;
            }
        });

        window.location = "confirmedAppt.html";
    }



});