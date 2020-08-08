'use strict';
class DepartmentsController extends ControllerBase {
    constructor() {
        super();
        this.Model = new DepartmentsModel(this.Settings);
        this.Helper = new DepartmentsHelper(this.Settings);
    }

    RenderPage() {
        try {
            this.#BindEventHandlers();
            this.#FetchModel();
            this.#PopulatePageControls();
        }
        catch (Error) {
            new LogHelper(this.Settings).LogError(constructor.name, Error);
        }
    }

    #FetchModel() {
        try {
            this.Model.GetDepartments();
            this.ModelCopy = JSON.parse(JSON.stringify(this.Model.Departments));
        }
        catch (Error) {
            new LogHelper(this.Settings).LogError(constructor.name, Error);
        }
    }

    #BindEventHandlers() {
        $("#_btnOK").click(function () {
            this.Save();
        });

        $("#_btnAdd").click(function () {
            var i = $("[id^=_lstRow]").length + 1;
            var html = "<div class='_lstRow' id='_lstRow#" + i + "'>";
            html += "<input type='text' class='_txtText DepCode' id='_txtDepCode#" + i + "' value=''/>";
            html += "<input type='text' class='_txtText DepName' id='_txtTextName#" + i + "' value='' />";
            html += "<div class='_btnDelete' id='_btnDelete#" + i + "' title='Delete'/> <div class='_btnRefresh'  id='_btnRefresh#" + i + "' title='Refresh'/></div>";
            $("#_lstDepartments").append(html);
        });

        $(document).on('click', '[id^=_btnDelete]', function () {
            var id = this.id.split("#")[1];
            alert("Delete " + id);
        });

        $(document).on('click', '[id^=_btnRefresh]', function () {
            var id = this.id.split("#")[1];
            alert("Reload " + id);
        });
    }
    
    #PopulatePageControls() {
        try {
            var html = "";
            html += "<div class='_lstHead'><div class='DepCode ColHdCode'>Code</div><div class='DepName ColHdName'>Name</div>";
            var i = 1;
            if (this.Model.Departments != null) {
                this.Model.Departments.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow#" + i + "'><input type='text' class='_txtText DepCode'  id='_txtDepCode#" + i + "' value='" + element.Code + "'/><input type='text' class='_txtText DepName'  id='_txtTextName#" + i + "' value='" + element.Name + "'/>";
                    html += "<div class='_btnDelete' id='_btnDelete#" + i + "' title='Delete'/> <div class='_btnRefresh'  id='_btnRefresh#" + i + "' title='Refresh'/></div><br>";
                    i++;
                });
            } else {
                html = "Error!";
            }
            $("#_lstDepartments").html(html);
        }
        catch (Error) {
            new LogHelper(this.Settings).LogError(constructor.name, Error);
        }
    }

    Save() {
        try {
            var Depts = [];
            $("#_lstDepartments").children("._lstRow").each(function () {
                var DeptCode = $(this).find(".DepCode").first().val();
                var DeptName = $(this).find(".DepName").first().val();
                var Dept = new DepartmentEntry(0, DeptCode, DeptName, "");
                Depts.push(Dept);
            });
            this.Model.Departments = Depts;
            this.Model.Update();
        }
        catch (Error) {
            alert(Error);
        }
    }
}

function RenderDepartmentsPage() {
    try {
        var Ctrl = new DepartmentsController();
        Ctrl.PageInit();
        if (Ctrl.SessionCheck()) {
            Ctrl.RenderPage();
        } else {
            Ctrl.Logout();
            window.location = "/Views/Login.html";
        }
    }
    catch (Error) {
        alert(Error);
    }
}



