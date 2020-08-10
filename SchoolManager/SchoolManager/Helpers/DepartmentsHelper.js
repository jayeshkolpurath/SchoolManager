'use strict';
class DepartmentsHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("ModelCopy", JSON.stringify(Data));
        }
        catch (Error) {

        }
    }
    GetModelCopy() {
        var objStorage = new StorageHelper();
        var RetVal = JSON.parse(objStorage.Get("ModelCopy"));
        return RetVal;
    }
}