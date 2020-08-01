'use strict';
class DepartmentsController extends ControllerBase {
    constructor() {
        super();
        this.DepList = null;
        this.DepListOriginal = null;

    }
    FillControls() {
        var DepModel = new DepartmentsModel();
        this.DepList = DepModel.GetDepartments();
        this.DepListOriginal = JSON.parse(JSON.stringify(this.DepList));
        var html = "";
        var i = 1;
        this.DepList.forEach(element => {
            html += "<div class='_lstRow'><input type='text' class='_txtText DepCode'  id='_txtDepCode'" + i + "' value='" + element.Code + "'/><input type='text' class='_txtText DepName'  id='_txtTextName" + i + "' value='" + element.Name + "'/>";
            html += "<div class='_btnDelete' id='_btnDelete" + i + "' title='Delete'/> <div class='_btnRefresh'  id='_btnRefresh" + i + "' title='Refresh'/></div><br>";
        });
        $("#_lstDepartments").html(html);
        $("#_btnOK").click(function () {
            var Model = new DepartmentsModel();
            var Depts = [];
            $("#_lstDepartments").children("._lstRow").each(function () {
                var DeptCode = $(this).find(".DepCode").first().val();
                var DeptName = $(this).find(".DepName").first().val();
                var Dept = new DepartmentEntry(0,DeptCode,DeptName,"");
                Depts.push(Dept);
            });
            Model.Update(Depts);
        });
    }

    Save() {
        this.Model.Update();
    }
}

function RenderDepartmentsPage() {
    var Ctrl = new DepartmentsController();
    Ctrl.PageInit();
    if (Ctrl.SessionCheck()) {
        Ctrl.FillControls();
    } else {
        $("#TitlePanel").css("display", "none");
        Ctrl.Logout();
        $("#PagePanel").load("/Views/Login.html");
    }
}



