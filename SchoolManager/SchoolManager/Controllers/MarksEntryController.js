class MarksEntryController extends ControllerBase {
    RenderPage() {
        $("#Content").html("Hello");
    }
}

function RenderMarksEntryPage() {
    var Ctrl = new MarksEntryController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display","none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
}



