//Controller Class

class LoginController extends ControllerBase {
    Login(UserName, Password) {
        var objUserModel = new UserModel(this.Settings);
        objUserModel.UserLogin(UserName, Password);
        var LoginStatus = objUserModel.SessionKey;
        var Result = false;
        if (LoginStatus) {
            var d = new Date();
            SessionHelper.Set("SACurrentUserName", UserName );
            SessionHelper.Set("SALoginTime", d.getTime());
            SessionHelper.Set("SAAPISessionKey", objUserModel.SessionKey);

            Result = true;
        } else {
            SessionHelper.Delete("SAAPISessionKey");
            Result = false;
        }
        return Result;
    }
}


//Page Events
$(document).ready(function () {
    var Controller = new LoginController();
    $("#LoginButton").click(function () {
        var LoginResult = Controller.Login($("#txt_UserName").val(), $("#txt_Password").val());
        if (LoginResult) {
            $("#TitlePanel").css("display", "none");
            window.location = "/Views/Layout.html";
        } else {
            $("#lbl_ErrorMsg").html("Invalid User Name or Password!");
        }
    });

    $("#lnkSignOut").click(function () {
        Controller.Logout();
    });
});

