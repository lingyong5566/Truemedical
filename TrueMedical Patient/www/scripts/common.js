function serverURL() {
    return "https://mp13.projectsbit.org/truemedical"; // here to change DB
}

function validationMsgs(message, title, button) {
    navigator.notification.alert(
        message,
        function () { },
        title,
        button
    );
}

function doAJAXCall(partialLink, dataToSend, callback, callbackFailed) {

    var url = serverURL() + partialLink;

    var data = dataToSend;
    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (arr) {
            callback(arr);
            return "Success";
        },
        error: function (arr) {
            callbackFailed(arr);
            return "Failed";
        }
    });

}

function printnavbar() {
    //binds the buttons on the NavBar

    $("#btnHome").bind("click", function () {
        window.location = "homepage.html";
    });

    //user presses logout
    $("#btnLogout").bind("click", function () {
        localStorage.removeItem("userid");      //remove userid from localstorage
        localStorage.removeItem("password");    //remove password from localstorage
        window.location = "index.html";         //bring user back to index.html
    });

    $("#btnAppt").bind("click", function () {
        window.location = "makeAppointment.html";
    });

    var userid = localStorage.getItem('userid');
    $("#btnCheckIn").bind("click", function () {
        window.location = "https://mp13.projectsbit.org/truemedical/qrscanner.html?userid=" + userid;
    });

    $("#btnHistory").bind("click", function () {
        window.location = "history.html";
    });

    $("#btnContact").bind("click", function () {
        window.location = "contactus.html";
    });

    $("#btnEnquire").bind("click", function () {
        window.location = "quickenquire.html";
    });

    $("#btnYourInfo").bind("click", function () {
        window.location = "manualUpdate.html";
    });

    $("#btnBMI").bind("click", function () {
        window.location = "bmicalculator.html";
    });

    $("#btnChat").bind("click", function () {
        window.location = "chat.html";
    });
}



