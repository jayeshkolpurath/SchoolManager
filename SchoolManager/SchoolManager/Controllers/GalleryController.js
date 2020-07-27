$(document).ready(function () {
    var Ctrl = new GalleryController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display","none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
});

class GalleryController extends ControllerBase {
    RenderPage() {
        $("#Content").html ("Hello");
    }
}

