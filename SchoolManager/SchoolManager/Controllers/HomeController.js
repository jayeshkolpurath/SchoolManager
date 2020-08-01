class HomeController extends ControllerBase {
    FillControls() {
        var html = "<div><h1>Home</h1><p>Home Content</p></div>";
        $("#Content").html(html);
    }
}
function RenderHomePage() {    
    var Ctrl = new HomeController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.FillControls();
    } else {
        $("#TitlePanel").css("display", "none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
}



