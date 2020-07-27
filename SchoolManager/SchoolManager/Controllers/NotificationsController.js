$(document).ready(function () {
    var Ctrl = new NotificationsController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display","none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
});

class NotificationsController extends ControllerBase {
    RenderPage() {
        $("#Content").html ("Hello");
    }
}

