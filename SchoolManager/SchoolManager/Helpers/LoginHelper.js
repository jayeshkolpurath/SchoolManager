class LoginHelper extends HelperBase {
    constructor(ProjSettings) {
        super(ProjSettings);
    }

    SaveUserSession(UserName, key) {
        try {
            var d = new Date();
            var objStorage = new StorageHelper();
            objStorage.Set("SACurrentUserName", UserName);
            objStorage.Set("SALoginTime", d.getTime());
            objStorage.Set("SAAPISessionKey", key);
        } catch (Error) {

        }
    }
    RemoveUserSession() {
        var objStorage = new StorageHelper();
        objStorage.Delete("SAAPISessionKey");
    }
}