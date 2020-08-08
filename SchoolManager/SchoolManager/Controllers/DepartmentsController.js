'use strict';
class DepartmentsController extends ControllerBase {
    constructor() {
        super();
        this.Model = new DepartmentsModel(this.Settings);
        this.Helper = new DepartmentsHelper(this.Settings);
    }

    RenderPage() {
        try {
            this.#FetchModel();
            this.#SaveModelCopy(this.Model);
            this.#PopulatePageControls();
            this.#BindEventHandlers();
        }
        catch (Error) {
            new LogHelper(this.Settings).LogError(constructor.name, Error);
        }
    }

    #FetchModel() {
        try {
            this.Model.GetDepartments();
        }
        catch (Error) {
            new LogHelper(this.Settings).LogError(constructor.name, Error);
        }
    }

    #SaveModelCopy(Data) {
        try {
            this.Helper.SaveModelCopy(Data);
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
            var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
            html += "<input type='text' class='_txtText DepCode' id='_txtDepCode_" + i + "' value=''/>";
            html += "<input type='text' class='_txtText DepName' id='_txtTextName_" + i + "' value='' />";
            html += "<div class='_btnDelete' id='_btnDelete_" + i + "' title='Delete'/>";
            html += "<div class='_btnRefresh' id='_btnRefresh_" + i + "' title='Refresh' />";
            html += "<input type='hidden' value='' id='hdnAction_" + i + "' value='A'/>";
            html += "</div >";
            $("#_lstDepartments").append(html);
        });

        $(document).on('click', '[id^=_btnDelete]', function () {
            var id = this.id.split("_").slice(-1)[0];
            $("#_lstRow_" + id + " > input ").addClass("Deleted"); 
            $("#hdnAction_" + id).val("D");
        });

        $(document).on('click', '[id^=_btnRefresh]', function () {
            try {
                var id = this.id.split("_").slice(-1)[0];
                $("#_lstRow_" + id + " > input ").removeClass("Deleted"); 
                var ModelCopy = new DepartmentsHelper(this.Settings).GetModelCopy();
                if (id <= ModelCopy.Departments.length) {
                    $("#_txtDepCode_" + id).val(ModelCopy.Departments[id - 1].Code);
                    $("#_txtTextName_" + id).val(ModelCopy.Departments[id - 1].Name);
                    $("#hdnAction_" + id).val(ModelCopy.Departments[id - 1].Action);
                } else {
                    $("#hdnAction_" + id).val("");
                }
            }
            catch (Error) {
                new LogHelper(this.Settings).LogError(constructor.name, Error);
            }
        });
    }

    #PopulatePageControls() {
        try {
            var html = "";
            html += "<div class='_lstHead'><div class='DepCode ColHdCode'>Code</div><div class='DepName ColHdName'>Name</div>";
            var i = 1;
            if (this.Model.Departments != null) {
                this.Model.Departments.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'><input type='text' class='_txtText DepCode'  id='_txtDepCode_" + i + "' value='" + element.Code + "'/>";
                    html += "<input type='text' class='_txtText DepName' id='_txtTextName_" + i + "' value='" + element.Name + "' />";
                    html += "<div class='_btnDelete' id='_btnDelete_" + i + "' title='Delete'/>";
                    html += "<div class='_btnRefresh' id='_btnRefresh_" + i + "' title='Refresh' />";
                    html += "<input type='hidden' value='' id='hdnAction_" + i + "' value='" + element.Action + "'/>";
                    html += "</div>";
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



