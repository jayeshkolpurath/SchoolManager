//Controller Class

class LoginController extends ControllerBase {
    Login(UserName, Password) {
        var objSessionHelper = new SessionHelper();
        var objUserModel = UserModel.FetchUserWithCredentials(UserName, Password);
        var Result = false;
        if (objUserModel != null) {
            objSessionHelper.Save("SASessionID", "TestUser");
            Result = true;
        } else {
            objSessionHelper.Delete("SASessionID");
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

