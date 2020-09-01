'use strict';
class CountriesModel extends ModelBase {
    Countries = [];
    constructor(Settings,Request) {
        super(Settings,Request);
    }

    GetCountries() {
        try {
            var Req = JSON.stringify(this.#CreateGetRequest());
            this.#DoRemoteCountriesAPICall(Req);
            return this.Countries;
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateCountries() {
        try {
            var Req = JSON.stringify(this.#CreateUpdateRequest());
            this.#DoRemoteCountriesAPICall(Req);
            return this.Countries;
        } catch (Ex) {
            throw Ex;
        }
    }

    #DoRemoteCountriesAPICall(RequestData) {
        try {
            var APIURL = this.Settings.APIURL + "/admin/ManageCountry";
            var AuthHeaderValue = "Bearer " + this.Request.Signature;
            console.log(AuthHeaderValue);
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
                    this.model.#ProcessCountriesAPIResponse(data);
                },
                error: function (jqXHR, status, err) {

                }
            });
        }
        catch (Ex) {
            throw Ex;
        }
    }
    #ProcessCountriesAPIResponse(Data) {
        try {      
            this.Countries = [];
            if (Data.signature != null) {
                this.Response = {Signature : Data.signature};
            }
            if (Data != null && Data.Countries != null) {                
                Data.Countries.forEach(element => {
                    if ((element.Action == 'D' && element.Message != '') || element.Action != 'D') {
                        var Ctry = new CountryEntry(element.Id, element.Code, element.Name, element.Nationality, element.Action, element.Message);
                        this.Countries.push(Ctry);
                    }
                });  
                if (this.Countries.length <= 0) {
                    this.#InsertBlankRow(this.Countries);
                }
            } else {
               
                if (this.Countries.length <= 0) {
                    this.#InsertBlankRow(this.Countries);                   
                }
            }
        }
        catch (Ex) {
            throw Ex;
        }
    }

    #CreateGetRequest() {
        var Req = {
            "Countries": [
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
                "Countries": []
            };
            this.Countries.forEach(element => {
                Req.Countries.push({ Id: element.ID, Code: element.Code, Name: element.Name, Nationality: element.Nationality, Action: element.Action });
            });
            return Req;
        } catch (Ex) {
            throw Ex;
        }
    }
    #InsertBlankRow(entity) {
        try {
            this.Countries = entity;
            console.log("InsertBlankRow", this.Countries.length)
            if (this.Countries.length <= 0) {
                var Ctry = new CountryEntry("", "", "", "", "A", "");
                this.Countries.push(Ctry);
                console.log("InsertBlankRow", this.Countries.length)
            }
        } catch (Ex) {
            throw Ex;
        }
    }
}

class CountryEntry {
    constructor(ID, Code, Name,Nationality, Action, Message) {
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Nationality = Nationality;
        this.Action = Action;
        this.Message = Message;
    }
}