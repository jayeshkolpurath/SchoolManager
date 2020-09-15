'use strict';
class CurrencyController extends ControllerBase {
    constructor() {
        try {
            super();          
            this.Model = new CurrencyModel(this.Settings);
            this.Helper = new CurrencyHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("Currency Constructor", Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'constructor', 'CurrencyController', '');
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
                this.Model.LogException(Ex.message, 'RenderPage', 'CurrencyController', '');
            }
        }
    }

    #FetchModel() {
        try {           
            if (sessionStorage.getItem("CurrencyCopy") === null) {
                this.Model.GetCurrency();
            }
            else {
                this.Model.Currency = this.Helper.GetModelCopy().Currency;
            }

        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'FetchModel', 'CurrencyController', '');
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
                this.Model.LogException(Ex.message, 'SaveModelCopy', 'CurrencyController', '');
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
                        Model.UpdateCurrency();
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
                Model.LogException(Ex.message, 'OkButtonClicked', 'CurrencyController', '');
            }
        }

    }

    #AddButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.AddRow();
            var RowCount = $("[id^=_lstRow]").length;
            $("#_txtCurrCode_" + RowCount).focus();
            var LastRow = $("#_lstCurrency").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });


        } catch (Ex) {
            new LogHelper(this.Settings).LogError("btnAdd Click :" + constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'AddButtonClicked', 'CurrencyController', '');
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
                Model.LogException(Ex.message, 'KeyPressed', 'CurrencyController', '');
            }
        }
    }

    #EditButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Helper;
            Helper.EditRow(this.id);
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtCurrCode_" + id).focus();
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Model;
            if (Model) {
                Model.LogException(Ex.message, 'EditButtonPressed', 'CurrencyController', '');
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
                Model.LogException(Ex.message, 'DeleteButtonPressed', 'CurrencyController', '');
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
                Model.LogException(Ex.message, 'RefreshButtonPressed', 'CurrencyController', '');
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
                Model.LogException(Ex.message, 'TxtFocusOut', 'CurrencyController', '');
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
                Model.LogException(Ex.message, 'OkPopup', 'CurrencyController', '');
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
            var LastRow = $("#_lstCurrency").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });

        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'PopulatePageControls', 'CurrencyController', '');
            }
        }
    }
}

function RenderCurrencyPage() {
    try {
        var Ctrl = new CurrencyController();
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
        new CurrencyModel(this.Settings).LogException(Ex.message, 'RenderCurrencyPage', 'CurrencyController', '')
    }
}



