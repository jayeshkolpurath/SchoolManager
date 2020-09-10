'use strict';
class RelationController extends ControllerBase {
    constructor() {
        try {
            super();
            this.Model = new RelationModel(this.Settings);
            this.Helper = new RelationHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("Relation Constructor", Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'constructor', 'RelationController', '');
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
                this.Model.LogException(Ex.message, 'RenderPage', 'RelationController', '');
            }
        }
    }

    #FetchModel() {
        try {
            if (sessionStorage.getItem("RelationCopy") === null) {
                this.Model.GetRelation();
            }
            else {
                this.Model.Relations = this.Helper.GetModelCopy().Relations;
            }

        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'FetchModel', 'RelationController', '');
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
                this.Model.LogException(Ex.message, 'SaveModelCopy', 'RelationController', '');
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
                        Model.UpdateRelation();
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
                Model.LogException(Ex.message, 'OkButtonClicked', 'RelationController', '');
            }
        }

    }

    #AddButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.AddRow();
            var RowCount = $("[id^=_lstRow]").length;
            $("#_txtRelCode_" + RowCount).focus();
            var LastRow = $("#_lstRelation").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });


        } catch (Ex) {
            new LogHelper(this.Settings).LogError("btnAdd Click :" + constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'AddButtonClicked', 'RelationController', '');
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
                Model.LogException(Ex.message, 'KeyPressed', 'RelationController', '');
            }
        }
    }

    #EditButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.EditRow(this.id);
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtRelCode_" + id).focus();
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'EditButtonPressed', 'RelationController', '');
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
                Model.LogException(Ex.message, 'DeleteButtonPressed', 'RelationController', '');
            }
        }
    }

    #RefreshButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.RefreshRow(this.id);
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'RefreshButtonPressed', 'RelationController', '');
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
                Model.LogException(Ex.message, 'TxtFocusOut', 'RelationController', '');
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
                Model.LogException(Ex.message, 'OkPopup', 'RelationController', '');
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
            var LastRow = $("#_lstRelation").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });

        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'PopulatePageControls', 'RelationController', '');
            }
        }
    }
}

function RenderRelationPage() {
    try {
        var Ctrl = new RelationController();
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
        new RelationModel(this.Settings).LogException(Ex.message, 'RenderRelationPage', 'RelationController', '')
    }
}



