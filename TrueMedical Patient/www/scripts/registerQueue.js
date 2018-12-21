(function () {
    $(document).on("pagebeforecreate", function () {
        printheader();
        printfooter();
    });

    $(document).ready(function () {

        //Routing to first timer page
        $("#btnAddQueue").bind("click", function () {
            routeToAddQueue();
        });

        $("#btnAppt").bind("click", function () {
            routeToMakeAppt();
        });
    });

    function routeToAddQueue() {
        window.location = ""; // Input html for first button
    }

    function routeToMakeAppt() {
        window.location = "makeAppointment.html";
    }
})();