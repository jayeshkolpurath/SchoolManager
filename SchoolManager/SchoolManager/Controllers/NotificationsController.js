class NotificationsController extends ControllerBase {
    RenderPage() {
        $("#Content").html("Hello");
    }
}

function RenderNotificationsPage() {
    var Ctrl = new NotificationsController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display","none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
}



