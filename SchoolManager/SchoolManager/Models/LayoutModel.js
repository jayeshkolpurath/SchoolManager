'use strict';
class LayoutModel extends ModelBase {
    Menu = [];
    constructor(Settings) {
        super(Settings);
    }

    GetMenu() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteMenuAPICall(Req);
            return this.Menus;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateMenu() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteMenuAPICall(Req);
            return this.Menu;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteMenuAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageMenu";
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
                    this.model.#ProcessMenuAPIResponse(Data);
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
    #ProcessMenuAPIResponse(Data) {
        try {
            if (Data != null && Data.Menu != null) {
                this.Menu = [];
                
                Data.Menu.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Bg = new MenuEntry(element.Id, element.Code, element.Name, element.Action, element.Message);
                        this.Menu.push(Bg);
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
            "Menus": [
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
                "Menus": []
            };
            this.Menu.forEach(element => {
                Req.Menu.push({ Id: element.ID, Code: element.Code, Name: element.Name, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
}

class MenuEntry {
    constructor(ID, Code, Name, Action, Message) {        
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
        this.Message = Message;
    }
}