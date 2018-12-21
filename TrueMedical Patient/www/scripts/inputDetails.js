(function () {
    $(document).on("pagebeforecreate", function () {
        printnavbar();
    });

    var userid;
    var email;
    var password;
    var passwordagain;
    var address;

    $(document).ready(function () {

        //Routing to scan page
        $("#btnScan").bind("click", function () {
            routeScan();
        });

        //Routing to manual entry
        $("#btnManualEntry").bind("click", function () {
            routeManualEntry();
        });
    });

    function routeScan() {
        window.location = ""; // Fill it in when have the html for scanning IC
    }

    function routeManualEntry() {
        window.location = "manualEntry.html";
    }

})();