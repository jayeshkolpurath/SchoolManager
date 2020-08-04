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
        SessionHelper.Reset();
    }

    PageInit() {

    }

    SessionCheck() {
        if (SessionHelper.Get("SASessionID")) {
            var SessionID = SessionHelper.Get("SASessionID");
            return true;
        } else {
            return false;
        }
    }

    GetTheme() {
        var ThemeName;
        if (SessionHelper.Get("Theme")) {
            ThemeName = SessionHelper.Get("Theme");
        } else {
            ThemeName = "Classic";
        }
        return ThemeName;
    }

    SetTheme(ThemeName) {
        SessionHelper.Set("Theme", ThemeName);
    }

    //Private Members    
    _ResetSession() {
        SessionHelper.Set("SASessionID", "");
        SessionHelper.Delete("SASessionID");
    }
}

