class StorageHelper {
    constructor(StorageType) {  //local or session
        try {
            if (StorageType != null && StorageType.toLowerCase() == "local") {
                this.Storage = localStorage;
            } else {
                this.Storage = sessionStorage;
            }
        } catch (Ex) {
            throw Ex;
        }
    }

    Set(Name, Value) {
        this.Storage.setItem(Name, Value);
    }

    Get(Name) {
        try {
            return this.Storage.getItem(Name);
        } catch (Ex) {
            throw Ex;
        }
    }

    Delete(Name) {
        try {
            this.Storage.setItem(Name, null);
            this.Storage.removeItem(Name);
        } catch (Ex) {
            throw Ex;
        }
    }
}