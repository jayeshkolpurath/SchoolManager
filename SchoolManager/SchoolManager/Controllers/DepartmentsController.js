class DepartmentsController extends ControllerBase {
    RenderPage() {
        var html = "<div><div class='_lblGroupHd'>Departments</div>";
        
        var Departments = DepartmentsModel.Get();
       
        var i = 1;
        html += "<img id='_btnAdd' src='/Content/Image/Add.jpg' title='Add New'/><img id='_btnEdit' src='/Content/Image/Edit.jpg' title='Edit'/></div>";
        html += "<div>";
        Departments.forEach(element => {
            html += "<div><div class='_lblInput'>" + i++ + "</div><input type='text' class='_txtText' value='" + element.Name + "'/>";
            html += "<img id='_btnDelete' src='/Content/Image/Delete.jpg' title='Delete'/> </div>";
        });
        html += "</div>"
        html += "<div><img id='_btnOK' src='/Content/Image/OK.jpg' title='OK'/></div>";
        $("#Content").html(html);
    }
}

$(document).ready(function () {
    var Ctrl = new DepartmentsController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.RenderPage();
    } else {
        $("#TitlePanel").css("display", "none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
});



