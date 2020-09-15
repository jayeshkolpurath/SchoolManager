'use strict';
class CurriculumController extends ControllerBase {
    constructor() {
        try {
            super();
            this.Model = new CurriculumModel(this.Settings);
            this.Helper = new CurriculumHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("Curriculums Constructor", Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'constructor', 'CurriculumController', '');
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
                this.Model.LogException(Ex.message, 'RenderPage', 'CurriculumController', '');
            }
        }
    }

    #FetchModel() {
        try {
            if (sessionStorage.getItem("CurriculumCopy") === null) {
                this.Model.GetCurriculums();
            }
            else {
                this.Model.Curriculums = this.Helper.GetModelCopy().Curriculums;
            }

        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'FetchModel', 'CurriculumController', '');
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
                this.Model.LogException(Ex.message, 'SaveModelCopy', 'CurriculumController', '');
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
                        Model.UpdateCurriculums();
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
            }
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'OkButtonClicked', 'CurriculumController', '');
            }
        }

    }

    #AddButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.AddRow();
            var RowCount = $("[id^=_lstRow]").length;
            $("#_txtCurCode_" + RowCount).focus();
            var LastRow = $("#_lstCurriculums").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });


        } catch (Ex) {
            new LogHelper(this.Settings).LogError("btnAdd Click :" + constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'AddButtonClicked', 'CurriculumController', '');
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
                Model.LogException(Ex.message, 'KeyPressed', 'CurriculumController', '');
            }
        }
    }

    #EditButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.EditRow(this.id);
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtCurCode_" + id).focus();
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'EditButtonPressed', 'CurriculumController', '');
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
                Model.LogException(Ex.message, 'DeleteButtonPressed', 'CurriculumController', '');
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
                Model.LogException(Ex.message, 'RefreshButtonPressed', 'CurriculumController', '');
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
                Model.LogException(Ex.message, 'TxtFocusOut', 'CurriculumController', '');
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
                Model.LogException(Ex.message, 'OkPopup', 'CurriculumController', '');
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
            var LastRow = $("#_lstCurriculums").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });

        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'PopulatePageControls', 'CurriculumController', '');
            }
        }
    }
}

function RenderCurriculumPage() {
    try {
        var Ctrl = new CurriculumController();
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
        new CurriculumModel(this.Settings).LogException(Ex.message, 'RenderCurriculumPage', 'CurriculumController', '')
    }
}



