(function () {
    "use strict";

    $(document).ready(function () {

        $("#btnLogin1").bind("click", function () {
            window.location = "login.html";
        });

        $("#btnRegister").bind("click", function () {
            window.location = "newuser.html";
        });
    });
})();