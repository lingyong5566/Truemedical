(function () {
    $(document).on("pagebeforecreate", function () {
        printnavbar();
    });

    //Variables
    var name;
    var nric;
    var mobileNo;
    var homeAdd;
    var DOB;

    function validateNRIC() {
        var phoneNumber = document.getElementById('textNRIC').value;
        var phoneRGEX = /[A-Z]\d{7}[A-Z]/;
        var phoneResult = phoneRGEX.test(phoneNumber);
        if (phoneResult) {
            return true;
        }
        else {
            alert("NRIC format is incorrect.");
            return false;
        }
    }

    function validatePhone() {
        var phoneNumber = document.getElementById('txtMobileNo').value;
        var phoneRGEX = /\d{8}/;
        var phoneResult = phoneRGEX.test(phoneNumber);
        if (phoneResult) {
            return true;
        }
        else {
            alert("Phone format is incorrect.");
            return false;
        }
    }

    function displayResults() {
        var JSONObject = {
            "userid": localStorage.getItem('userid')
        };

        var url = serverURL() + "/getpatient.php";

        $.ajax({
            url: url,
            type: 'GET',
            data: JSONObject,
            dataType: 'json',
            contentType: "application/json;",
            success: function (arr) {
                //alert(Object.keys(arr[0].result));
                document.getElementById('txtName').value = arr[0].result.name;
                document.getElementById('textNRIC').value = arr[0].result.nric;
                document.getElementById('txtMobileNo').value = arr[0].result.mobileNo;
                document.getElementById('txtHomeAdd').value = arr[0].result.homeAdd;
                document.getElementById('txtDOB').value = arr[0].result.DOB;
            },
            error: function (xhr, textStatus, errorThrown) {
                //alert("failed", xhr.responseText);
                alert(xhr.statusText);
                alert(textStatus);
                alert(errorThrown);
                return;
            }
        });
    }
    
    $(document).ready(function () {

        displayResults();

        $.validator.addMethod(
            "regex",
            function (value, element, regexp) {
                var re = new RegExp(regexp);
                alert(this.optional(element))
                alert(re.test(value));
                return this.optional(element) || re.test(value);
            },
            "Please check your input."
        );

        $("#NewPatientForm").validate({
            rules: {
                txtNRIC: {
                    required: true,
                    regex: /^[A - Z]\d{7}[A - Z]/
                }
            },
            messages: {
                txtName: "name is required",
                txtNRIC: {
                    required: "nric is required",
                    regex: "regex"
                },
                txtMobileNo: "mobile number is required",
                txtHomeAdd: "home address is required",
                txtDOB: "DOB is required"
            },
            focusInvalid: false,
            submitHandler: function () {
                return false;
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.parent().parent().after());
            }
        });

        //Input data into database
        $("#btnRegister2").bind("click", function () {

            if ($("#NewPatientForm").valid()) {
                if (validateNRIC() && validatePhone()) {
                    registerFirstTimer();
                }
                
            }
            else {
                return;
            }
        });
    });

    function literalString(input) {
        return "\"" + input + "\"";
    }

    function registerFirstTimer() {
        if ($("#NewPatientForm").valid()) {

            name = $("#txtName").val();
            nric = $("#textNRIC").val();
            mobileNo = $("#txtMobileNo").val();
            homeAdd = $("#txtHomeAdd").val();
            DOB = $("#txtDOB").val();

            var url = serverURL() + "/updatepatient.php";

            
            //we validate again
            if (validateNRIC() && validatePhone()) {

                //provide these parameters
                var JSONObject = {
                    "name": name,
                    "nric": nric,
                    "mobileNo": mobileNo,
                    "homeAdd": homeAdd,
                    "DOB": DOB,
                    "userid" : localStorage.getItem('userid')
                };
                $.ajax({
                    url: url,
                    type: 'GET',
                    data: JSONObject,
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    success: function (arr) {
                        //return;
                    },
                    error: function (xhr, textStatus, errorThrown) {

                        //alert("failed", xhr.responseText);
                        //alert(JSON.stringify(xhr));
                        //alert(textStatus);
                        //alert(errorThrown);
                        //return;
                    }
                });
                window.location = "homepage.html";
            }
            
        }

        
    }
    

    function _validate() {
        var validate = true;
        return validate;
    }
})();