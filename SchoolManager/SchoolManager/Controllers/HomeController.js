
$(document).ready(function () {
    var Ctrl = new HomeController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display", "none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
});

class HomeController extends ControllerBase {
    RenderPage() {

    }
}

