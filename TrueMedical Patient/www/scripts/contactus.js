(function () {
    //anything inside 'pagebeforecreate' will execute just before this page is rendered to the user's screen
    $(document).on("pagebeforecreate", function () {
        printnavbar();
    });
})();

$(document).ready(function () {
    $.mobile.defaultPageTransition = 'none';
    $("#mypanel").panel();
});