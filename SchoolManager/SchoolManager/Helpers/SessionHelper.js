class SessionHelper extends HelperBase {
    Save(Name, Value) {
        sessionStorage.setItem(Name, Value);
    }
    Delete(Name) {
        sessionStorage.setItem(Name, null);
        sessionStorage.removeItem(Name);
    }
}