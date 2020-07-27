class ControllerBase {
    Logout() {
        this._ResetSession();
    }

    PageInit() {

    }

    SessionCheck() {
        if (sessionStorage.getItem("SASessionID")) {
            var SessionID = sessionStorage.getItem("SASessionID");
            return true;
        } else {
            return false;
        }
    }

    GetTheme() {
        var ThemeName;
        if (sessionStorage.getItem("Theme")) {
            ThemeName = sessionStorage.getItem("Theme");
        } else {
            ThemeName = "Classic";
        }
        return ThemeName;
    }

    SetTheme(ThemeName) {
        sessionStorage.setItem("Theme", ThemeName);
    }

    //Private Members    
    _ResetSession() {
        sessionStorage.setItem("SASessionID", "");
        sessionStorage.removeItem("SASessionID");
    }
}

