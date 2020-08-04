'use strict';
class DepartmentsHelper extends HelperBase {
    constructor() {
        super();
        this.Result = null;
    }
    GetDepartments() {
        var RequestData = CreateGetRequest();
        $.ajax({
            type: "GET",
            url: "http://localhost:44376/admin/ManageDepartment",
            contentType: "application/json;",
            dataType: "json",
            timeout: 3000,
            data: RequestData,
            success: function (data) {
                this.Result = Data;
            },
            error: function (jqXHR, status, err) {
                this.Result = "Error";
            }
        });

        return this.Result;
    }

    CreateGetRequest() {
        var Req = { Name: "", Code: "", action: "S", status: "" };
        return Req;
    }

    Update(Depts) {
        var s = "";
        Depts.forEach(element => { s += element.Name; });
        alert("Updating ... " + s);
    }
}