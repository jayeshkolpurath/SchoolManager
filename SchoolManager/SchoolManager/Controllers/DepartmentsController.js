'use strict';
class DepartmentsController extends ControllerBase {
    DepList = null;
    DepListOriginal = null;
    constructor() {
        super();
    }
    FillControls() {
        var DepModel = new DepartmentsModel(this.Settings);
        this.DepList = DepModel.GetDepartments();
        this.DepListOriginal = JSON.parse(JSON.stringify(this.DepList));
        var html = "";
        html += "<div class='_lstHead'><div class='DepCode ColHdCode'>Code</div><div class='DepName ColHdName'>Name</div>";
        var i = 1;
        if (this.DepList != null) {
            this.DepList.forEach(element => {
                html += "<div class='_lstRow' id='_lstRow#" + i + "'><input type='text' class='_txtText DepCode'  id='_txtDepCode#" + i + "' value='" + element.code + "'/><input type='text' class='_txtText DepName'  id='_txtTextName#" + i + "' value='" + element.name + "'/>";
                html += "<div class='_btnDelete' id='_btnDelete#" + i + "' title='Delete'/> <div class='_btnRefresh'  id='_btnRefresh#" + i + "' title='Refresh'/></div><br>";
                i++;
            });
        } else {
            html = "Error!";
        }
        $("#_lstDepartments").html(html);
        $("#_btnOK").click(function () {
            var Model = new DepartmentsModel(this.Settings);
            var Depts = [];
            $("#_lstDepartments").children("._lstRow").each(function () {
                var DeptCode = $(this).find(".DepCode").first().val();
                var DeptName = $(this).find(".DepName").first().val();
                var Dept = new DepartmentEntry(0, DeptCode, DeptName, "");
                Depts.push(Dept);
            });
            Model.Update(Depts);
        });
        $("#_btnAdd").click(function () {
            var i = $("[id^=_lstRow]").length+1;
            var html = "<div class='_lstRow' id='_lstRow#" + i + "'>";
            html += "<input type='text' class='_txtText DepCode' id='_txtDepCode#" + i + "' value=''/>";
            html += "<input type='text' class='_txtText DepName' id='_txtTextName#" + i + "' value='' />";
            html += "<div class='_btnDelete' id='_btnDelete#" + i + "' title='Delete'/> <div class='_btnRefresh'  id='_btnRefresh#" + i + "' title='Refresh'/></div>";
            $("#_lstDepartments").append(html);
        });

        $(document).on('click','[id^=_btnDelete]',function () {
            var id = this.id.split("#")[1];
            alert("Delete "+ id);
        });

        $(document).on('click','[id^=_btnRefresh]',function () {
            var id = this.id.split("#")[1];
            alert("Reload " + id);
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



