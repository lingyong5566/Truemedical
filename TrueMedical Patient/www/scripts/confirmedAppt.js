(function () {
    $(document).on("pagebeforecreate", function () {
        printnavbar();
    });

    //Variables
    var date;
    var time;
    var email;

    $(document).ready(function() {
        date = localStorage.getItem("date");
        time = localStorage.getItem("time");
        document.getElementById('completed').innerHTML = "You have made an appointment \n"+
        "on "+date+"\n"+
        "@"+time+"\n"+
        "We will send you an email reminder...";
    });
})();