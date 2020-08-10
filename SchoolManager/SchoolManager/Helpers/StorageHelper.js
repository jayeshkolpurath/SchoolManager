class StorageHelper {
    constructor(StorageType) {  //local or session
        if (StorageType!=null && StorageType.toLowerCase() == "local") {
            this.Storage = localStorage;
        } else {
            this.Storage = sessionStorage;
        }
    }

    Set(Name, Value) {
        this.Storage.setItem(Name, Value);
    }

    Get(Name) {
        return this.Storage.getItem(Name);
    }

    Delete(Name) {
        this.Storage.setItem(Name, null);
        this.Storage.removeItem(Name);
    }
}