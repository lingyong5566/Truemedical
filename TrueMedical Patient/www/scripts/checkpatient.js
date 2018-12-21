$(document).on("pagebeforecreate", function () {
    printnavbar();
});

(function () {

    var userid;
    var email;
    var password;
    var passwordagain;
    var address;

    $(document).ready(function () {

        //Routing to first timer page
        $("#btnFirstTime").bind("click", function () {
            routetofirsttime();
        });

        $("#btnAlrPatient").bind("click", function () {
            routetoalrpatient();
        });
    });

    function routetofirsttime() {
        window.location = "inputDetails.html";
    }

    function routetoalrpatient() {
        window.location = "phpPatientEntry.html";
    }
    
})();