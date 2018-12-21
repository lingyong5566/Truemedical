
var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {
    var userid = localStorage.getItem('userid');
    
    var data = {
        "userid": localStorage.getItem('userid')
    };

    var url = serverURL() + "/qrstatusupdate.php";


    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            alert("Thank you for checking in with our application, please await your triage shortly.");
        },
        error: function () {
            return;
        }
    });

    window.location.href = "homepage.html";
    
});