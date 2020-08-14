'use strict';
class CountriesHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            SessionHelper.Set("ModelCopy", JSON.stringify(Data));
        }
        catch (Error) {

        }
    }
    GetModelCopy() {
        var RetVal = JSON.parse(SessionHelper.Get("ModelCopy"));
        return RetVal;
    }
}