﻿'use strict';
class DepartmentsModel extends ModelBase {
    Departments = [];
    constructor(Settings) {
        super(Settings);
    }

    GetDepartments() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteDepartmentsAPICall(Req);
            return this.Departments;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateDepartments() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteDepartmentsAPICall(Req);
            return this.Departments;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteDepartmentsAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageDepartment";
            var AuthHeaderValue = "Bearer " + new StorageHelper().Get("SAAPISessionKey");
            var ContentLength = RequestData.length;
            var Response = null;
            console.log("Call :" + JSON.stringify(RequestData));
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
                success: function (Data) {
                    this.model.#ProcessDepartmentsAPIResponse(Data);
                    if (Data.signature != null) {
                        new StorageHelper().Set("SAAPISessionKey", Data.Signature);
                    }
                },
                error: function (jqXHR, status, err) {

                }
            });
        }
        catch (Ex) {
            throw Ex;
        }
    }
    #ProcessDepartmentsAPIResponse(Data) {
        try {
            if (Data != null && Data.Departments != null) {
                this.Departments = [];
                Data.Departments.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Dept = new DepartmentEntry(element.Id, element.Code, element.Name, element.Action, element.Message);
                        this.Departments.push(Dept);
                    }
                });
            }
        }
        catch (Ex) {
            throw Ex;
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
        try {
            var Req = {
                "Departments": []
            };
            this.Departments.forEach(element => {
                Req.Departments.push({ Id: element.ID, Code: element.Code, Name: element.Name, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
}

class DepartmentEntry {
    constructor(ID, Code, Name, Action, Message) {        
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
        this.Message = Message;
    }
}