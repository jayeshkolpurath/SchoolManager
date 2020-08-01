class SessionHelper extends HelperBase {
    static Reset() {
        sessionStorage.clear();
    }
    static Set(Name, Value) {
        sessionStorage.setItem(Name, Value);
    }
    static Get(Name) {
        return sessionStorage.getItem(Name);
    }
    static Delete(Name) {
        sessionStorage.setItem(Name, null);
        sessionStorage.removeItem(Name);
    }
}