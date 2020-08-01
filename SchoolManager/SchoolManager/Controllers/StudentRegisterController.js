class StudentRegisterController extends ControllerBase {
    RenderPage() {
        $("#Content").html ("Hello");
    }
}


function RenderStudentRegisterPage() {
    var Ctrl = new StudentRegisterController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display","none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
}


