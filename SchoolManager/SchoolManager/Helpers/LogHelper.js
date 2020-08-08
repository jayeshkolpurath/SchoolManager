class LogHelper extends HelperBase {
    constructor(ProjSettings) {
        super(ProjSettings);
    }
    LogError(Module, Error) {
        alert("Module:" + Module + "\nError:" + Error);
    }
}