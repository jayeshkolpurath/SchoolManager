class LoginHelper extends HelperBase {
    constructor(ProjSettings) {
        super(ProjSettings);
        this.SessionData = null;
    }
    CreateGetRequest(UID, Pwd) {
        var st = { name: UID, password: Pwd };
        return st;
    }   

    DoRemoteLogin(UserName, Password) {
        var RequestData = this.CreateGetRequest(UserName, Password);
        this.SessionData = null;
        var Payload = JSON.stringify(RequestData);
        var ContentLength = Payload.length;
        var LoginURL = this.Settings.APIURL + "/utils/AuthCheck";
        $.ajax({
            type: "POST",
            url: LoginURL,
            contentType: "application/json;charset=utf-8",
            headers: { "Accept-Encoding":"gzip, deflate, sdch, br", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true", "Access-Control-Allow-Headers": ContentLength, "Access-Control-Expose-Headers": ContentLength},
            Connection: "keep-alive",
            dataType: "json",
            async: false,
            timeout: 1000,
            data: Payload,
            success: function (data) {
                if (data.code == "200") {
                    this.SessionData = data;  // Success
                } else {
                    this.SessionData = "Error";
                }
            },
            error: function (jqXHR, status, err) {
                this.SessionData = "Error";
            }
        });
    }

    Login(UserName, Password) {
        this.DoRemoteLogin(UserName, Password);
    }
}