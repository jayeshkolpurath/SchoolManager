class UserModel extends ModelBase {

    constructor(ProjSettings) {
        super(ProjSettings);
        this.SessionKey = null;
    }
    UserLogin(UserName, Password) {
        var objLoginHelper = new LoginHelper(this.Settings);
        var RetVal = objLoginHelper.Login(UserName, Password);
        if (objLoginHelper.SessionData != null) {
            this.SessionKey = objLoginHelper.SessionData.signature;
            RetVal = true;
        }
    }
}