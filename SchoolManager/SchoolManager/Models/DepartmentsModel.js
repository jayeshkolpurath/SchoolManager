'use strict';
class DepartmentsModel extends ModelBase {
    Departments = [];
    constructor(Settings) {
        super(Settings);
    }

    GetDepartments() {
        var Req = JSON.stringify(this.CreateGetRequest());
        this.#DoRemoteDepartmentsFetch(Req);
        return this.Departments;
    }

    UpdateDepartments() {

    }

    #DoRemoteDepartmentsFetch(RequestData) {
        var APIURL = this.Settings.APIURL + "/admin/ManageDepartment";
        var AuthHeaderValue = "Bearer " + SessionHelper.Get("SAAPISessionKey");
        var ContentLength = RequestData.length;
        var Response = null;
        try {
            $.ajax({
                type: "POST",
                url: APIURL,
                model: this,
                contentType: "application/json;charset=utf-8",
                headers: { "Authorization": AuthHeaderValue, "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": ContentLength, "Access-Control-Expose-Headers": ContentLength },
                Connection: "keep-alive",
                dataType: "json",
                async: false,
                timeout: this.Settings.APITimeOut,
                data: RequestData,
                success: function (data) {
                    this.model.#ProcessGetDepartmentsResponse(data);
                },
                error: function (jqXHR, status, err) {

                }
            });
        }
        catch (Error) {

        }
    }
    #ProcessGetDepartmentsResponse(data) {
        if (data != null && data.departments != null) {
            this.Departments = [];
            data.departments.forEach(element => {
                var Dept = new DepartmentEntry(0, element.code, element.name, "");
                this.Departments.push(Dept);
            });
        } 
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
}

class DepartmentEntry {
    constructor(ID, Code, Name, Action) {
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
    }
}