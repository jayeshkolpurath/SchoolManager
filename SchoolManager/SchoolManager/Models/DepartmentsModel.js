'use strict';
class DepartmentsModel extends ModelBase {
    Departments = [];
    constructor(Settings) {
        super(Settings);
    }

    GetDepartments() {
        var Req = JSON.stringify(this.#CreateGetRequest());
        this.#DoRemoteDepartmentsAPICall(Req);
        return this.Departments;
    }

    UpdateDepartments() {
        var Req = JSON.stringify(this.#CreateUpdateRequest());
        this.#DoRemoteDepartmentsAPICall(Req);
        return this.Departments;
    }


    #DoRemoteDepartmentsAPICall(RequestData) {
        var APIURL = this.Settings.APIURL + "/admin/ManageDepartment";
        var AuthHeaderValue = "Bearer " + new StorageHelper().Get("SAAPISessionKey");
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
                    this.model.#ProcessDepartmentsAPIResponse(data);
                },
                error: function (jqXHR, status, err) {

                }
            });
        }
        catch (Error) {

        }
    }
    #ProcessDepartmentsAPIResponse(data) {
        try {
            if (data != null && data.departments != null) {
                this.Departments = [];
                data.departments.forEach(element => {
                    var Dept = new DepartmentEntry(element.id, element.code, element.name, element.action);
                    this.Departments.push(Dept);
                });
            }
        }
        catch (Error) {

        }
    }

    #CreateGetRequest() {
        var Req = {
            "Departments": [
                {
                    "Action": "S"
                }
            ]
        };
        return Req;
    }

    #CreateUpdateRequest() {
        var Req = {
            "Departments": []
        };
        this.Departments.forEach(element => {
            Req.Departments.push({id:element.ID,code:element.Code, name:element.Name, action:element.Action});
        });
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