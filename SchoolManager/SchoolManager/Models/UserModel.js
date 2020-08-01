class UserModel extends ModelBase {

    constructor(UserName, Password) {
        super();
        this.UserName = UserName;
        this.Password = Password;
    }

    Login(UserName, Password) {
        /*
    Check if User exists in database with the given username and password
    if yes return the user object; otherwise return null.
    */
        var objLoginHelper = new LoginHelper();
        var objUserModel = objLoginHelper.FetchUserWithCredentials(UserName, Password);
        return objUserModel; //return dummy value - to be replaced with actual code
    }
}