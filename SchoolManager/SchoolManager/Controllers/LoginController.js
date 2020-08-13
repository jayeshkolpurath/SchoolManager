//Controller Class

class LoginController extends ControllerBase {
    constructor() {
        super();
        this.Model = new LoginModel(this.Settings);
        this.Helper = new LoginHelper(this.Settings);
        this.SessionHelper = new SessionHelper(this.Settings);
    }
    PopulatePageControls() {

    }

    Login(UserName, Password) {
        try {
            var LoginResult = this.Model.UserLogin(UserName, Password);
            if (LoginResult) {
                this.SessionHelper.SaveUserSession(UserName);
                this.SessionHelper.UpdateSessionKey(this.Model.SessionKey);
                $("#TitlePanel").css("display", "none");
                window.location = "/Views/Layout.html";
            } else {
                this.SessionHelper.RemoveUserSession();
                $("#lbl_ErrorMsg").html("Invalid User Name or Password!");
            }
        }
        catch (Error) {
            $("#lbl_ErrorMsg").html("Error!" + Error);
            new LogHelper(this.Settings).LogError(constructor.name, Error);
        }
    }
}


//Page Events
$(document).ready(function () {
    var Controller = new LoginController();
    Controller.PopulatePageControls();

    $("#LoginButton").click(function () {
        Controller.Login($("#txt_UserName").val(), $("#txt_Password").val());
    });

    $("#lnkSignOut").click(function () {
        Controller.Logout();
    });
});

