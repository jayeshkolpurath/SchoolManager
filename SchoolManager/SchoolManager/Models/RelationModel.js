'use strict';
class RelationModel extends ModelBase {
    Relations = [];
    constructor(Settings) {
        super(Settings);
    }

    GetRelation() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteRelationAPICall(Req);
            return this.Relations;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateRelation() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteRelationAPICall(Req);
            return this.Relations;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteRelationAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageRelation";
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
                    this.model.#ProcessRelationAPIResponse(Data);
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
    #ProcessRelationAPIResponse(Data) {
        try {
            if (Data != null && Data.Relations != null) {
                this.Relations = [];
                
                Data.Relations.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Bg = new RelationEntry(element.Id, element.Code, element.Name, element.Action, element.Message);
                        this.Relations.push(Bg);
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
            "Relations": [
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
                "Relations": []
            };
            this.Relations.forEach(element => {
                Req.Relations.push({ Id: element.ID, Code: element.Code, Name: element.Name, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
}

class RelationEntry {
    constructor(ID, Code, Name, Action, Message) {        
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
        this.Message = Message;
    }
}