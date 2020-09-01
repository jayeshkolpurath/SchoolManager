'use strict';
class StatesController extends ControllerBase {
    constructor() {
        try {
            super();
            this.Model = new StatesModel(this.Settings);
            this.LoadScriptFiles({ RefURLs: [{ URL: "/Models/CountriesModel.js" }, { URL: "/Helpers/CountriesHelper.js" }] });
            this.CountriesModel = new CountriesModel(this.Settings, { Signature: new SessionHelper().Get("SAAPISessionKey") });
            this.Helper = new StatesHelper(this.Settings);
            this.CountriesHelper = new CountriesHelper(this.Settings);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("States Constructor", Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'constructor', 'StatesController', '');
            }
        }
    }

    RenderPage() {
        try {
            console.log("CountriesModel :" + JSON.stringify(this.CountriesModel));
            this.#FetchModel();
            this.#SaveModelCopy();
            this.#PopulatePageControls();
            this.#BindEventHandlers();
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError("RenderPage :" + constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'RenderPage', 'StatesController', '');
            }
        }
    }

    #FetchModel() {
        try {
            var objStorageHelper = new StorageHelper();
            if (objStorageHelper.Get("StateCopy") === null) {
                this.Model.GetStates();
            }
            else {

                this.Model.States = this.Helper.GetModelCopy().States;
            }

            var objCountr = this.CountriesHelper.GetModelCopy();
            if (objCountr !== null && objCountr.Countries != null && objCountr.Countries.length>0) {
                this.CountriesModel.Countries = objCountr.Countries;
                console.log("Countries : " + JSON.stringify(this.CountriesModel.Countries));
            }
            else {
                this.CountriesModel.GetCountries();
            }

        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'FetchModel', 'StatesController', '');
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
                this.Model.LogException(Ex.message, 'SaveModelCopy', 'StatesController', '');
            }
        }
    }

    #OkButtonClicked(EventArgs) {
        try {
            $("#_saveLoader").show();
            var Helper = EventArgs.data.Controller.Helper;
            if (Helper.ValidateData()) {
                setTimeout(function () {
                    try {
                        Helper.SaveData(EventArgs.data.Controller.Model);
                        var Model = EventArgs.data.Controller.Model;
                        Model.UpdateStates();
                        Helper.SaveModelCopy(Model);
                        if (Helper.ShowSavedAction(EventArgs.data.Controller.Model)) {
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
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'OkButtonClicked', 'StatesController', '');
            }
        }

    }

    #AddButtonClicked(EventArgs) {
        try {
            var Helper = EventArgs.data.Controller.Helper;
            Helper.AddRow(EventArgs.data.Controller.CountriesModel);
            var RowCount = $("[id^=_lstRow]").length;
            $("#_txtStateCode_" + RowCount).focus();
            var LastRow = $("#_lstStates").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });


        } catch (Ex) {
            new LogHelper(this.Settings).LogError("btnAdd Click :" + constructor.name, Ex);
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'AddButtonClicked', 'StatesController', '');
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
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'KeyPressed', 'StatesController', '');
            }
        }
    }

    #EditButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Controller.Helper;
            Helper.EditRow(this.id);
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtStateCode_" + id).focus();
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'EditButtonPressed', 'StatesController', '');
            }
        }
    }

    #DeleteButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Controller.Helper;
            Helper.DeleteRow(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'DeleteButtonPressed', 'StatesController', '');
            }
        }
    }

    #RefreshButtonPressed(EventArgs) {
        try {
            var Helper = EventArgs.data.Controller.Helper;
            Helper.RefreshRow(this.id);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'RefreshButtonPressed', 'StatesController', '');
            }
        }
    }
    #TxtFocusOut(EventArgs) {
        try {
            var Helper = EventArgs.data.Controller.Helper;
            Helper.TxtFocusOut(this.id);
        } catch (Ex) {
            new LogHelper(EventArgs.data.Controller.Helper.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'TxtFocusOut', 'StatesController', '');
            }
        }
    }
    #OkPopup(EventArgs) {
        try {
            $('#_saveSuccess').hide();
            var Ctrl = EventArgs.data.Controller;
            Ctrl.RenderPage();
        }
        catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            var Model = EventArgs.data.Controller.Model;
            if (Model) {
                Model.LogException(Ex.message, 'OkPopup', 'StatesController', '');
            }
        }
    }
    #BindEventHandlers() {
        $("#_btnOK").click({ Controller: this }, this.#OkButtonClicked);
        $("#_btnAdd").click({ Controller: this }, this.#AddButtonClicked);
        $(document).on("keydown", ":text", { Controller: this }, this.#KeyPressed);
        $(document).on('click', '[id^=_btnEdit]', { Controller: this }, this.#EditButtonPressed);
        $(document).on('click', '[id^=_btnDelete]', { Controller: this }, this.#DeleteButtonPressed);
        $(document).on('click', '[id^=_btnRefresh]', { Controller: this }, this.#RefreshButtonPressed);
        $(document).on('focusout', '[id^=_txt]', { Controller: this }, this.#TxtFocusOut);
        $(document).on('click', '[id^=okPopUp]', { Controller: this }, this.#OkPopup);

    }

    #PopulatePageControls() {
        try {
            this.Helper.PopulatePageControls(this.Model, this.CountriesModel);
            var LastRow = $("#_lstStates").children().last();
            $("#_btnAdd").css({ left: LastRow.left, top: LastRow.position().top });

        } catch (Ex) {
            new LogHelper(this.Settings).LogError(constructor.name, Ex);
            if (this.Model) {
                this.Model.LogException(Ex.message, 'PopulatePageControls', 'StatesController', '');
            }
        }
    }
}

function RenderStatesPage() {
    try {
        var Ctrl = new StatesController();
        Ctrl.PageInit();
        if (Ctrl.SessionCheck()) {
            Ctrl.RenderPage();
        } else {
            Ctrl.Logout();
            window.location = "/Views/Login.html";
        }
    }
    catch (Ex) {
        throw Ex;
    }
}



