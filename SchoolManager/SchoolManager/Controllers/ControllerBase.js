'use strict';
class ControllerBase {
    constructor() {
        try {
            var objStorage = new StorageHelper();
            var stng = objStorage.Get("SASettings");
            if (!stng) {
                $.getJSON("/params.json", function (s) {
                    objStorage.Set("SASettings", JSON.stringify(s.Settings));
                    this.Settings = s.Settings;
                });
            } else {
                this.Settings = JSON.parse(stng);
            }
        } catch (Ex) {
            throw Ex;
        }
    }

    Logout() {
        var objStorage = new StorageHelper();
        objStorage.Delete("SACurrentUserName");
        objStorage.Delete("SALoginTime");
        objStorage.Delete("SAAPISessionKey");
        window.location = "/Views/Login.html";
    }

    PageInit() {

    }

    SessionCheck() {
        var objStorage = new StorageHelper();
        var SessionID = objStorage.Get("SAAPISessionKey");
        if (SessionID) {
            return true;
        } else {
            return false;
        }
    }


    //Private Members    
    _ResetSession() {
        var objStorage = new StorageHelper();
        objStorage.Set("SASessionID", "");
        objStorage.Delete("SASessionID");
    }
}

