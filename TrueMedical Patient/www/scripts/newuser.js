var app = angular.module('myApp', []);
app.controller('asdCtrl', function ($scope, $http) {

    var userid;
    var email;
    var password;
    var passwordagain;
    var address;

    $(document).ready(function () {
        $("#NewUserForm").validate({
            rules: {
                txtNewEmail: {
                    email: true
                },
                txtNewPasswordAgain: {
                    equalTo: "#txtNewPassword"
                }
            },
            messages: {
                txtNewLogin: "new user name is required",
                txtNewEmail: "new email address is required and must be of the format name@email.com",
                txtNewPassword: "new password is required",
                txtNewPasswordAgain: "new password again is required and must be the same as new password",
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            }
        });
        
    });

    //New User Saving Section
    function savenewuser() {
        if ($("#NewUserForm").valid()) {

            userid = $("#txtNewLogin").val();
            email = $("#txtNewEmail").val();
            password = $("#txtNewPassword").val();
            passwordagain = $("#txtNewPasswordAgain").val();

            //we validate again
            if (_validate()) {
                var url = serverURL() + "/newuser.php";

                //provide these parameters
                var JSONObject = {
                    "userid": userid,
                    "password": password,
                    "email": email,
                };

                $.ajax({
                    url: url,
                    type: 'GET',
                    data: JSONObject,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function (arr) {
                        _getNewUserResult(arr); //call is successful. execute _getNewUserResult()
                    },
                    error: function () {
                        validationMsg(); //error. pop error message by executing validationMsg()
                    }
                });
            }
        }
    }

    function _validate() {
        var validate = true;
        return validate;
    }

    function _getNewUserResult(arr) {
        if (arr[0].result === 1) { //newuser.php accepts this newuser
            localStorage.setItem("userid", userid); //save useris into localstorage
            localStorage.setItem("password", password); //save password into localstorage
            localStorage.setItem("email", email); //save password into localstorage
            validationMsgs("Thank you for using our application, " + userid + "!", "Validation", "OK");
            window.location = "checkpatient.html";
        }
        else { //you tried to insert the same thing the 2nd time
            validationMsgs(userid + " already exists! Please choose another username.", "Validation", "OK");
        }
    }

    $scope.sendOTP = function() {
        console.log("We are calling SendOTP()");
        var url = serverURL() + "/sendEmail.php";
        var otp = Math.floor(Math.random() * 90000) + 10000;
        $.ajax({
            url: url,
            type: 'GET',
            data: { "otp": otp.toString(), "email": $scope.email },
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });
        sentOTP(otp.toString());
    }

    function sentOTP(otp) {
        var enterOTP = prompt("Please enter your OTP", "");
        if (enterOTP == otp) {
            alert("Successfully Registered");
            // Make Appt
            // Route to Slide 18
            savenewuser();
        }
        else {
            alert("OTP is wrong");
        }
    }
});