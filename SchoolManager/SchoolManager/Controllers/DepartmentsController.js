'use strict';
class DepartmentsController extends ControllerBase {
    constructor() {
        try {
            super();
            this.Model = new DepartmentsModel(this.Settings);
            this.Helper = new DepartmentsHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("Departments Constructor", Ex);
        }
    }

    RenderPage() {
        try {
            this.#FetchModel();
            this.#SaveModelCopy();
            this.#PopulatePageControls();
            this.#BindEventHandlers();
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError("RenderPage :" + constructor.name, Ex);
        }
    }

    #FetchModel() {
        try {
            this.Model.GetDepartments();
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #SaveModelCopy() {
        try {
            this.Helper.SaveModelCopy(this.Model);
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #OkButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.SaveData(EventArgs.data.Model);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #AddButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.AddRow();
            var RowCount = $("[id^=_lstRow]").length;
            $("#_txtDepCode_" + RowCount).focus();
            var LastRow = $("#_lstDepartments").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });


        } catch (Ex) {
            new LogHelper(this.Settings).LogError("btnAdd Click :" + constructor.name, Ex);
        }
    }

    #KeyPressed(EventArgs) {
        try {
            var keycode = (EventArgs.keyCode ? EventArgs.keyCode : EventArgs.which);
            if (keycode == '13') {
                $(this).next().focus();
            }
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #EditButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.EditRow(this.id);
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtDepCode_" + id).focus();
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #DeleteButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.DeleteRow(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #RefreshButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.RefreshRow(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
        }
    }

    #BindEventHandlers() {
        $("#_btnOK").click({ Model:this.Model, Helper:this.Helper }, this.#OkButtonClicked);
        $("#_btnAdd").click({ Model:this.Model, Helper:this.Helper }, this.#AddButtonClicked);
        $(document).on("keydown", ":text", { Model:this.Model, Helper:this.Helper },this.#KeyPressed);
        $(document).on('click', '[id^=_btnEdit]', { Model:this.Model, Helper:this.Helper },this.#EditButtonPressed);
        $(document).on('click', '[id^=_btnDelete]', { Model:this.Model, Helper:this.Helper },this.#DeleteButtonPressed);
        $(document).on('click', '[id^=_btnRefresh]', { Model: this.Model, Helper: this.Helper },this.#RefreshButtonPressed);
    }

    #PopulatePageControls() {
        try {
            this.Helper.PopulatePageControls(this.Model);
            var LastRow= $("#_lstDepartments").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
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
    catch (Ex) {
        new LogHelper(this.Settings).LogError("RenderPage:" + constructor.name, Ex);
    }
}



