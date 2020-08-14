'use strict';
class CountriesModel extends ModelBase {
    Countries = [];
    constructor(Settings) {
        super(Settings);
    }

    GetCountries() {
        var Req = JSON.stringify(this.#CreateGetRequest());
        this.#DoRemoteCountriesAPICall(Req);
        return this.Countries;
    }

    UpdateCountries() {
        var Req = JSON.stringify(this.#CreateUpdateRequest());
        this.#DoRemoteCountriesAPICall(Req);
        return this.Countries;
    }


    #DoRemoteCountriesAPICall(RequestData) {
        var APIURL = this.Settings.APIURL + "/admin/ManageCountry";
        var AuthHeaderValue = "Bearer " + SessionHelper.Get("SAAPISessionKey");
        var ContentLength = RequestData.length;
        var Response = null;
        try {
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
        catch (Error) {

        }
    }
    #ProcessCountriesAPIResponse(data) {
        try {
          
            if (data != null && data.countries != null) {
                this.Countries = [];
                data.countries.forEach(element => {
                    var Cotry = new CountryEntry(element.id, element.code, element.name, element.nationality, element.action);
                    this.Countries.push(Cotry);
                });
            }
            
        }
        catch (Error) {

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
        var Req = {
            "Countries": []
        };
        this.Countries.forEach(element => {
            Req.Countries.push({ id: element.ID, code: element.Code, name: element.Name, nationality: element.Nationality,  action: element.Action });
        });
        return Req;
    }
}

class CountryEntry {
    constructor(ID, Code, Name, Nationality, Action) {
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Nationality = Nationality;
        this.Action = (Action == null || Action==' ' ) ? '' : Action;
        
    }
} 