class LoginModel extends ModelBase {
    UserName = null;
    Password = null;
    SessionKey = null;
    constructor(ProjSettings) {
        super(ProjSettings);
    }

    UserLogin(UserName, Password) {
        var RetVal = false;
        try {
            var RequestData = this.#CreateGetRequest(UserName, Password);
            this.#DoRemoteLogin(RequestData);
            RetVal = (this.SessionKey !== null)
        } catch (Error) {

        }
        return RetVal;
    }

    #DoRemoteLogin(RequestData) {
        this.SessionKey = null;
        var Payload = JSON.stringify(RequestData);
        var ContentLength = Payload.length;
        var LoginURL = this.Settings.APIURL + "/utils/AuthCheck";
        try {
            $.ajax({
                type: "POST",
                model: this,
                url: LoginURL,
                contentType: "application/json;charset=utf-8",
                headers: { "Accept-Encoding": "gzip, deflate, sdch, br", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": ContentLength, "Access-Control-Expose-Headers": ContentLength },
                Connection: "keep-alive",
                dataType: "json",
                async: false,
                timeout: this.Settings.APITimeOut,
                data: Payload,
                success: function (data) {
                    this.model.#ProcessResponse(data);
                },
                error: function (jqXHR, status, err) {
                    this.SessionKey = null;
                }
            });
        }
        catch (Error) {
            this.SessionKey = null;
        }
    }

    #ProcessResponse(data) {
        if (data.code == "200") {
            this.SessionKey = data.signature;  // Success
        }
    }

    #CreateGetRequest(UID, Pwd) {
        var st = { name: UID, password: Pwd };
        return st;
    }

}