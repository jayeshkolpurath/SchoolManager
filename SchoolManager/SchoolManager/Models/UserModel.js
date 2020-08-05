class UserModel extends ModelBase {
    SessionKey = null;
    constructor(ProjSettings) {
        super(ProjSettings);
    }
    UserLogin(UserName, Password) {
        var objLoginHelper = new LoginHelper(this.Settings);
        var RetVal = objLoginHelper.Login(UserName, Password);
        var key=SessionHelper.Get("SAAPISessionKey");
        if ( key!= null) {
            this.SessionKey = key;
            RetVal = true;
        }
    }
}