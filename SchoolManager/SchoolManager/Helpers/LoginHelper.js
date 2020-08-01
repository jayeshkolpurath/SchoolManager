class LoginHelper extends HelperBase {
    FetchUserWithCredentials(UserName, Password) {
        var RetVal = null;
        if (UserName == "test" && Password == "test") {
            RetVal = { UserName: UserName, Password: Password }; //dummy code
        }
        return RetVal;
    }
}