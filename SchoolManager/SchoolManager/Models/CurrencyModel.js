'use strict';
class CurrencyModel extends ModelBase {
    Currency = [];
    constructor(Settings) {
        super(Settings);
    }

    GetCurrency() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteCurrencyAPICall(Req);
            return this.Currency;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateCurrency() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteCurrencyAPICall(Req);
            return this.Currency;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteCurrencyAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageCurrency";
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
                    this.model.#ProcessCurrencyAPIResponse(data);
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
    #ProcessCurrencyAPIResponse(Data) {
        try {
            this.Currency = [];
            if (Data != null && Data.Currencies != null) {
                Data.Currencies.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Ctry = new CurrencyEntry(element.Id, element.Code, element.Name, element.BaseCurrency, element.Precisions, element.Stats, element.Action, element.Message);
                        this.Currency.push(Ctry);                        
                    }
                });
                if (this.Currency.length <= 0) {
                    this.#InsertBlankRow(this.Currency);
                }
            } else {
                    
                if (this.Currency.length <= 0) {
                    this.#InsertBlankRow(this.Currency);
                }
            }
            
        }
        catch (Ex) {
            throw Ex;
        }
    }

    #CreateGetRequest() {
        var Req = {
            "Currencies": [
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
                "Currencies": []
            };
            this.Currency.forEach(element => {
                Req.Currencies.push({ Id: element.ID, Code: element.Code, Name: element.Name, Basecurrency: element.Basecurrency, Precisions: element.Precisions, Stats:element.Stats, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
    #InsertBlankRow(entity) {
        try {
            this.Currency = entity;            
            if (this.Currency.length <= 0) {
                var Ctry = new CurrencyEntry("", "", "", "", "", "","A", "");
                this.Currency.push(Ctry);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
}

class CurrencyEntry {
    constructor(ID, Code, Name, Basecurrency, Precisions, Stats, Action, Message) {
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Basecurrency = Basecurrency;
        this.Precisions = Precisions;
        this.Stats = Stats;
        this.Action = Action;
        this.Message = Message;
    }
}