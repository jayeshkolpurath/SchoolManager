'use strict';
class DepartmentsController extends ControllerBase {
    constructor() {
        try {
            super();
            this.Model = new DepartmentsModel(this.Settings);
            this.Helper = new DepartmentsHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("Departments Constructor", Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'constructor', 'DepartmentsController', '');
            }
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
            if (this.Model) {
                this.Model.LogException(Ex.message, 'RenderPage', 'DepartmentsController', '');
            }
        }
    }

    #FetchModel() {
        try {
            if (sessionStorage.getItem("DepartmentCopy") === null) {
                this.Model.GetDepartments();
            }
            else {
                this.Model.Departments = this.Helper.GetModelCopy().Departments;
            }

        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'FetchModel', 'DepartmentsController', '');
            }
        }
    }

    #SaveModelCopy() {
        try {
            this.Helper.SaveModelCopy(this.Model);
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'SaveModelCopy', 'DepartmentsController', '');
            }
        }
    }

    #OkButtonClicked(EventArgs) {
        try {
            $("#_saveLoader").show();
            var Helper = EventArgs.data.Helper;
            if (Helper.ValidateData()) {              
                setTimeout(function () {
                    try {
                        Helper.SaveData(EventArgs.data.Model);
                        var Model = EventArgs.data.Model;
                        Model.UpdateDepartments();
                        Helper.SaveModelCopy(Model);
                        if (Helper.ShowSavedAction(EventArgs.data.Model)) {
                        }
                    } catch (Ex) {
                        new LogHelper(this.Settings).LogError(constructor.name, Ex);
                    }
                    $("#_saveLoader").hide();
                    $("#_saveSuccess").show();
                }, 1000);
            }
            else {
                $("#_saveLoader").hide();
                console.log('In valid entry');
            }
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'OkButtonClicked', 'DepartmentsController', '');
            }
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
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'AddButtonClicked', 'DepartmentsController', '');
            }
        }
    }

    #KeyPressed(EventArgs) {
        try {
            var keycode = (EventArgs.keyCode ? EventArgs.keyCode : EventArgs.which);
            if (keycode == '13') {
                if (!isNaN(($(this).attr('tabindex')))) {
                    var tabindex = parseInt($(this).attr('tabindex'));
                    tabindex += 1;
                    $('[tabindex = ' + tabindex + ']').focus();
                }

            }
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'KeyPressed', 'DepartmentsController', '');
            }
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
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'EditButtonPressed', 'DepartmentsController', '');
            }
        }
    }

    #DeleteButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.DeleteRow(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'DeleteButtonPressed', 'DepartmentsController', '');
            }
        }
    }

    #RefreshButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.RefreshRow(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'RefreshButtonPressed', 'DepartmentsController', '');
            }
        }
    }
    #TxtFocusOut(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.TxtFocusOut(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'TxtFocusOut', 'DepartmentsController', '');
            }
        }
    }
    #OkPopup(EventArgs) {
        try {
            $('#_saveSuccess').hide();
            var Ctrl = EventArgs.data.Ctrl;
            Ctrl.RenderPage();
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'OkPopup', 'DepartmentsController', '');
            }
        }
    }
    #BindEventHandlers() {
        $("#_btnOK").click({ Model: this.Model, Helper: this.Helper }, this.#OkButtonClicked);
        $("#_btnAdd").click({ Model: this.Model, Helper: this.Helper }, this.#AddButtonClicked);
        $(document).on("keydown", ":text", { Model: this.Model, Helper: this.Helper }, this.#KeyPressed);
        $(document).on('click', '[id^=_btnEdit]', { Model: this.Model, Helper: this.Helper }, this.#EditButtonPressed);
        $(document).on('click', '[id^=_btnDelete]', { Model: this.Model, Helper: this.Helper }, this.#DeleteButtonPressed);
        $(document).on('click', '[id^=_btnRefresh]', { Model: this.Model, Helper: this.Helper }, this.#RefreshButtonPressed);
        $(document).on('focusout', '[id^=_txt]', { Model: this.Model, Helper: this.Helper }, this.#TxtFocusOut);
        $(document).on('click', '[id^=okPopUp]', { Ctrl: this, Model: this.Model, Helper: this.Helper }, this.#OkPopup);
    }

    #PopulatePageControls() {
        try {
            this.Helper.PopulatePageControls(this.Model);
            var LastRow = $("#_lstDepartments").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });

        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'PopulatePageControls', 'DepartmentsController', '');
            }
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
        new DepartmentsModel(this.Settings).LogException(Ex.message, 'RenderDepartmentsPage', 'DepartmentsController', '')
    }
}



