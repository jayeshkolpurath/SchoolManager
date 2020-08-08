'use strict';
class ControllerBase {
    constructor() {
        var stng = SessionHelper.Get("SASettings");
        if (!stng) {
            $.getJSON("/params.json", function (s) {
                SessionHelper.Set("SASettings", JSON.stringify(s.Settings));
                this.Settings = s.Settings;
            });
        } else {
            this.Settings = JSON.parse(stng);
        }

    }
    Logout() {
        SessionHelper.Delete("SACurrentUserName");
        SessionHelper.Delete("SALoginTime");
        SessionHelper.Delete("SAAPISessionKey");
    }

    PageInit() {

    }

    SessionCheck() {
        var SessionID = SessionHelper.Get("SAAPISessionKey");
        if (SessionID) {
            return true;
        } else {
            return false;
        }
    }
 

    //Private Members    
    _ResetSession() {
        SessionHelper.Set("SASessionID", "");
        SessionHelper.Delete("SASessionID");
    }
}

