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
                success: function (Data) {
                    this.model.#ProcessBloodGroupsAPIResponse(Data);
                    if (Data.Signature != null) {
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
    #ProcessBloodGroupsAPIResponse(Data) {
        try {
            if (Data != null && Data.BloodGroups != null) {
                this.BloodGroups = [];
                
                Data.BloodGroups.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Bg = new BloodGroupsEntry(element.Id, element.Code, element.Name, element.Action, element.Message);
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
                Req.BloodGroups.push({ Id: element.ID, Code: element.Code, Name: element.Name, Action: element.Action });
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