'use strict';
class DepartmentsHelper extends HelperBase {
    Result = null;
    constructor(Settings) {
        super(Settings);
    }

    GetDepartments() {
        var RequestData = JSON.stringify(this.CreateGetRequest());
        var APIURL = this.Settings.APIURL + "/admin/ManageDepartment";
        var AuthHeaderValue = "Bearer " + SessionHelper.Get("SAAPISessionKey");
        var ContentLength = RequestData.length;
        var Response=null;
        $.ajax({
            type: "POST",
            url: APIURL,
            contentType: "application/json;charset=utf-8",
            headers: { "Authorization": AuthHeaderValue, "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": ContentLength, "Access-Control-Expose-Headers": ContentLength },
            Connection: "keep-alive",
            dataType: "json",
            async: false,
            timeout: 3000,
            data: RequestData,
            success: function (data) {
                if (data != null && data.departments != null) {
                    Response=data.departments;
                }
            },
            error: function (jqXHR, status, err) {
            }
        });
        return Response;
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