'use strict';
class BloodGroupsModel extends ModelBase {
    BloodGroups = [];
    constructor(Settings) {
        super(Settings);
    }

    GetBloodGroups() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteBloodGroupsAPICall(Req);
            return this.BloodGroupss;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateBloodGroups() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteBloodGroupsAPICall(Req);
            return this.BloodGroups;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteBloodGroupsAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageBloodGroup";
            var AuthHeaderValue = "Bearer " + new StorageHelper().Get("SAAPISessionKey");
            var ContentLength = RequestData.length;
            var Response = null;
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
                    this.model.#ProcessBloodGroupsAPIResponse(data);
                    if (data.signature != null) {
                        new StorageHelper().Set("SAAPISessionKey", data.signature);
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
    #ProcessBloodGroupsAPIResponse(data) {
        try {
            if (data != null && data.bloodgroups != null) {
                this.BloodGroups = [];
                
                data.bloodgroups.forEach(element => {
                    if ((element.action == 'D' && element.message != '') || element.action != 'D') {
                        var Bg = new BloodGroupsEntry(element.id, element.code, element.name, element.action, element.message);
                        this.BloodGroups.push(Bg);
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
            "BloodGroups": [
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
                "BloodGroups": []
            };
            this.BloodGroups.forEach(element => {
                Req.BloodGroups.push({ id: element.ID, code: element.Code, name: element.Name, action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
}

class BloodGroupsEntry {
    constructor(ID, Code, Name, Action, Message) {        
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
        this.Message = Message;
    }
}