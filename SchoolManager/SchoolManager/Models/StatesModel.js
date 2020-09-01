'use strict';
class StatesModel extends ModelBase {
    States = [];
    constructor(Settings) {
        super(Settings);
    }

    GetStates() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteStatesAPICall(Req);
            return this.States;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateStates() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteStatesAPICall(Req);
            return this.States;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteStatesAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageState";
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
                    this.model.#ProcessStatesAPIResponse(Data);
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
    #ProcessStatesAPIResponse(Data) {
        try {

            if (Data != null && Data.States != null) {
                this.States = [];
                Data.States.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Dept = new StateEntry(element.Id, element.Code, element.Name, element.CountryCode, element.Action, element.Message);
                        this.States.push(Dept);
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
            "States": [
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
                "States": []
            };
            this.States.forEach(element => {
                Req.States.push({ Id: element.ID, Code: element.Code, Name: element.Name, CountryCode: element.CountryCode, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
}

class StateEntry {
    constructor(ID, Code, Name, CountryCode,Action, Message) {        
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.CountryCode = CountryCode;
        this.Action = Action;
        this.Message = Message;
    }
}