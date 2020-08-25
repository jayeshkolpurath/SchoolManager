'use strict';
class CountriesController extends ControllerBase {
    constructor() {
        try {
            super();
            this.Model = new CountriesModel(this.Settings);
            this.Helper = new CountriesHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("Countries Constructor", Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'constructor', 'CountriesController', '');
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
                this.Model.LogException(Ex.message, 'RenderPage', 'CountriesController', '');
            }
        }
    }

    #FetchModel() {
        try {
            if (sessionStorage.getItem("CountryCopy") === null) {
                this.Model.GetCountries();
            }
            else {
                this.Model.Countries = this.Helper.GetModelCopy().Countries;
            }

        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'FetchModel', 'CountriesController', '');
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
                this.Model.LogException(Ex.message, 'SaveModelCopy', 'CountriesController', '');
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
                        Model.UpdateCountries();
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
                Model.LogException(Ex.message, 'OkButtonClicked', 'CountriesController', '');
            }
        }

    }

    #AddButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.AddRow();
            var RowCount = $("[id^=_lstRow]").length;
            $("#_txtCtrCode_" + RowCount).focus();
            var LastRow = $("#_lstCountries").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });


        } catch (Ex) {
            new LogHelper(this.Settings).LogError("btnAdd Click :" + constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'AddButtonClicked', 'CountriesController', '');
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
                Model.LogException(Ex.message, 'KeyPressed', 'CountriesController', '');
            }
        }
    }

    #EditButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.EditRow(this.id);
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtCtrCode_" + id).focus();
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'EditButtonPressed', 'CountriesController', '');
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
                Model.LogException(Ex.message, 'DeleteButtonPressed', 'CountriesController', '');
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
                Model.LogException(Ex.message, 'RefreshButtonPressed', 'CountriesController', '');
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
                Model.LogException(Ex.message, 'TxtFocusOut', 'CountriesController', '');
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
                Model.LogException(Ex.message, 'OkPopup', 'CountriesController', '');
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
            var LastRow = $("#_lstCountries").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });

        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'PopulatePageControls', 'CountriesController', '');
            }
        }
    }
}

function RenderCountriesPage() {
    try {
        var Ctrl = new CountriesController();
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
        new CountriesModel(this.Settings).LogException(Ex.message, 'RenderCountriesPage', 'CountriesController', '')
    }
}



