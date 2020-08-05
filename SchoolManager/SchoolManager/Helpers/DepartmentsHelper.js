'use strict';
class DepartmentsHelper extends HelperBase {
    #Result = null;
    constructor(Settings) {
        super(Settings);
    }
    GetDepartments() {
        var RequestData = JSON.stringify(this.CreateGetRequest());
        var APIURL = this.Settings.APIURL + "/admin/ManageDepartment";
        var AuthHeaderValue = "Bearer " + SessionHelper.Get("SAAPISessionKey");
        var ContentLength = RequestData.length;
        $.ajax({
            type: "POST",
            url: APIURL,
            contentType: "application/json;",
            headers: { "Authorization": AuthHeaderValue, "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": ContentLength, "Access-Control-Expose-Headers": ContentLength },
            Connection: "keep-alive",
            dataType: "json",
            async: false,
            timeout: 3000,
            data: RequestData,
            success: function (data) {
                this.#Result = data;
            },
            error: function (jqXHR, status, err) {
                this.#Result = "Error";
            }
        });
        return this.#Result;
    }

    CreateGetRequest() {
        var Req = {
            "Departments": [
                {
                    "Action": "S"
                }
            ]
        };
        return Req;
    }

    Update(Depts) {
        var s = "";
        Depts.forEach(element => { s += element.Name; });
        alert("Updating ... " + s);
    }
}