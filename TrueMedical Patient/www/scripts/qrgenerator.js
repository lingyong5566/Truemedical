
var app = angular.module('myApp', []);
app.controller('patientCtrl', function ($scope, $http) {
    var userid = localStorage.getItem('userid');
    console.log(serverURL());
    var url = '';
    if (window.location.port == 80 || window.location.port == 443 || window.location.port == undefined || window.location.port == '') {
        url = window.location.hostname + "/qrstatusupdate.html";
    }
    else
        url = window.location.hostname + ":" + window.location.port + "/qrstatusupdate.html";
    console.log(url);
    var newQRCode = new QRCode(document.getElementById("qrcode"), url);
    
});