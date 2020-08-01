//Controller Class

class LoginController extends ControllerBase {
    Login(UserName, Password) {
        var objUserModel = new UserModel();
        var CurUser= objUserModel.Login(UserName, Password);
        var Result = false;
        if (CurUser != null) {
            var d = new Date();
            SessionHelper.Set("SASessionID", CurUser.UserName+"|"+ d.getTime());
            Result = true;
        } else {
            SessionHelper.Delete("SASessionID");
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

