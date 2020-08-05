class UserModel extends ModelBase {

    constructor(ProjSettings) {
        super(ProjSettings);
        this.SessionKey = null;
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