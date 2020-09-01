class SessionHelper extends HelperBase {
    constructor(ProjSettings) {
        super(ProjSettings);
    }

    SaveUserSession(UserName) {
        try {
            var d = new Date();
            var objStorage = new StorageHelper();
            objStorage.Set("SACurrentUserName", UserName);
            objStorage.Set("SALoginTime", d.getTime());
        } catch (Ex) {
            throw Ex;
        }
    }

    UpdateSessionKey(key) {
        try {
            var d = new Date();
            var objStorage = new StorageHelper();
            objStorage.Set("SAAPISessionKey", key);
        } catch (Ex) {
            throw Ex;
        }
    }

    Get(Key) {
        try {
            var objStorage = new StorageHelper();
            var Result = objStorage.Get(Key);
            return Result;
        }
        catch (Ex) {
            throw Ex;
        }
    }

    RemoveUserSession() {
        try {
            var objStorage = new StorageHelper();
            objStorage.Delete("SAAPISessionKey");
            objStorage.Delete("SACurrentUserName");
            objStorage.Delete("SALoginTime");
        } catch (Ex) {
            throw Ex;
        }
    }
}