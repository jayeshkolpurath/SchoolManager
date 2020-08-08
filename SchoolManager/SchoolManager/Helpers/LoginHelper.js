class LoginHelper extends HelperBase {
    constructor(ProjSettings) {
        super(ProjSettings);
    }

    SaveUserSession(UserName, key) {
        var d = new Date();
        SessionHelper.Set("SACurrentUserName", UserName);
        SessionHelper.Set("SALoginTime", d.getTime());
        SessionHelper.Set("SAAPISessionKey", key);
    }
    RemoveUserSession() {
        SessionHelper.Delete("SAAPISessionKey");
    }
}