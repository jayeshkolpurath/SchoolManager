'use strict';
class DepartmentsHelper extends HelperBase {
    constructor() {
        super();
        this.Result = null;
    }
    GetDepartments() {
       $.ajax({
            type: "GET",
            url: "https://localhost:44343/weatherforecast",
            contentType:"application/json;",
            dataType: "json",
            timeout:3000,
            success: function (data) {
                this.Result = data;
            },
            error: function (jqXHR, status, err) {
                this.Result = "Error";
            }
       });

        return this.Result;
    }

    Update(Depts) {
        var s = "";
        Depts.forEach(element => { s += element.Name; });
        alert("Updating ... " + s);
    }
}