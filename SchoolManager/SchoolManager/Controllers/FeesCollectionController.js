class FeesCollectionController extends ControllerBase {
    RenderPage() {
        $("#Content").html("Hello");
    }
}
function RenderFeesCollectionPage() {
    var Ctrl = new FeesCollectionController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display","none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
}
  


