'use strict';
class CurriculumModel extends ModelBase {
    Curriculums = [];
    constructor(Settings) {
        super(Settings);
    }

    GetCurriculums() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteCurriculumsAPICall(Req);
            return this.Curriculums;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateCurriculums() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteCurriculumsAPICall(Req);
            return this.Curriculums;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteCurriculumsAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageCurriculum";
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
                    this.model.#ProcessCurriculumsAPIResponse(data);
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
    #ProcessCurriculumsAPIResponse(Data) {
        try {
            this.Curriculums = [];
            if (Data != null && Data.Curriculums != null) {
                Data.Curriculums.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Curri = new CurriculumEntry(element.Id, element.Code, element.Name,  element.Action, element.Message);
                        this.Curriculums.push(Curri);
                    }
                });
                if (this.Curriculums.length <= 0) {
                    this.#InsertBlankRow(this.Curriculums);
                }
            } else {

                if (this.Curriculums.length <= 0) {
                    this.#InsertBlankRow(this.Curriculums);
                }
            }
        }
        catch (Ex) {
            throw Ex;
        }
    }

    #CreateGetRequest() {
        var Req = {
            "Curriculums": [
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
                "Curriculums": []
            };
            this.Curriculums.forEach(element => {
                Req.Curriculums.push({ Id: element.ID, Code: element.Code, Name: element.Name,  Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
    #InsertBlankRow(entity) {
        try {
            this.Curriculums = entity;
            if (this.Curriculums.length <= 0) {
                var Curri = new CurriculumEntry("", "", "", "A", "");
                this.Curriculums.push(Curri);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
}

class CurriculumEntry {
    constructor(ID, Code, Name,  Action, Message) {
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
        this.Message = Message;
    }
}