'use strict';
class SectionModel extends ModelBase {
    Sections = [];
    constructor(Settings) {
        super(Settings);
    }

    GetSection() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteSectionAPICall(Req);
            return this.Sections;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateSection() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteSectionAPICall(Req);
            return this.Sections;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteSectionAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageSection";
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
                    this.model.#ProcessSectionAPIResponse(Data);
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
    #ProcessSectionAPIResponse(Data) {
        try {
            if (Data != null && Data.Sections != null) {
                this.Sections = [];
                
                Data.Sections.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Bg = new SectionEntry(element.Id, element.Code, element.Name, element.Action, element.Message);
                        this.Sections.push(Bg);
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
            "Sections": [
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
                "Sections": []
            };
            this.Sections.forEach(element => {
                Req.Sections.push({ Id: element.ID, Code: element.Code, Name: element.Name, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
}

class SectionEntry {
    constructor(ID, Code, Name, Action, Message) {        
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
        this.Message = Message;
    }
}