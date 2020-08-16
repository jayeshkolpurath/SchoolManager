class ModelBase {
    constructor(Settings) {
        this.Settings = Settings;
    }
    LogException(Remarks,MethodName,ClassName,TUI) {
        try {
            console.log('LogException');
            var Req = JSON.stringify(this.#CreateExceptionRequest(Remarks, MethodName, ClassName, TUI));
            this.#DoRemoteExceptioAPICall(Req);
        } catch (Ex) {
            console.log('LogException Ex');
            throw Ex;
        }
    }
    #CreateExceptionRequest(Remarks, MethodName, ClassName, TUI) {
        try {
            console.log('CreateExceptionRequest');
            var Req = {
                "eventlogs": []
            };
            Req.eventlogs.push({ Remarks: Remarks, MethodName: MethodName, ClassName: ClassName, TUI: TUI , action : 'A'});
            return Req;
        } catch (Ex) {
            console.log('CreateExceptionRequest Ex');
            throw Ex;
        }
    }
    #DoRemoteExceptioAPICall(RequestData) {
        try {
            console.log('DoRemoteExceptioAPICall ');
            var APIURL = this.Settings.APIURL + "/utils/LogEvent";
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
                async: true,
                timeout: this.Settings.APITimeOut,
                data: RequestData,
                success: function (data) {
                    //this.model.#ProcessDepartmentsAPIResponse(data);
                },
                error: function (jqXHR, status, err) {

                }
            });
        }
        catch (Ex) {
            console.log('DoRemoteExceptioAPICall Ex');
            throw Ex;
        }
    }
}