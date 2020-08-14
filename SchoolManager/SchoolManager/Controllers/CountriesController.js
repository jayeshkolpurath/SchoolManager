'use strict';
class CountriesController extends ControllerBase {
    constructor() {
        super();
        this.Model = new CountriesModel(this.Settings);
        this.Helper = new CountriesHelper(this.Settings);
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
            this.Model.GetCountries();                 
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

    #OkButtonClicked(event) {
        try {
            var Coutry = [];
            var i = 1;
            $("#_lstCountries").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var CotrCode = $(this).find(".CtrCode").first().val();
                var CotrName = $(this).find(".CtrName").first().val();
                var CotrNationality = $(this).find(".CtrNationality").first().val();
                var act = $(this).find(".RowAction").first().val();
                var Cotr = new CountryEntry(Id, CotrCode, CotrName, CotrNationality, act);
                Coutry.push(Cotr);
                i++;
            });
            event.data.Countries = Coutry;
            event.data.UpdateCountries();
        }
        catch (Error) {
            alert(Error);
        }
    }


    #BindEventHandlers() {
        $("#_btnOK").click(this.Model, this.#OkButtonClicked);

        $("#_btnAdd").click(function () {
            var i = $("[id^=_lstRow]").length + 1;
            var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
            html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
            html += "<input type='text' class='_txtText CtrCode' id='_txtCtrCode_" + i + "' value=''/>";
            html += "<input type='text' class='_txtText CtrName' id='_txtTextName_" + i + "' value='' />";
            html += "<input type='text' class='_txtText CtrNationality' id='_txtCtrNationality_" + i + "' value='' />";
            html += "<div class='FlagsCol'><div class='_btnEdit Button' id='_btnEdit_" + i + "' title='Edit'/></div>";
            html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
            html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
            html += "<input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/>";
            html += "<input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/>";
            html += "</div >";
            $("#_lstCountries").append(html);
        });

        $(document).on('click', '[id^=_btnEdit]', function () {
            var id = this.id.split("_").slice(-1)[0];
            $("#_txtCtrCode_" + id).prop("readonly", false);
            $("#_txtTextName_" + id).attr("readonly", false);
            $("#_txtCtrNationality_" + id).attr("readonly", false);
            $("#_FlagsIcon_" + id).addClass("EditedIcon");
            $("#_btnEdit_" + id).hide("slow");
            $("#_btnRefresh_" + id).show("slow");
            $("#hdnAction_" + id).val("E");
        });

        $(document).on('click', '[id^=_btnDelete]', function () {
            var id = this.id.split("_").slice(-1)[0];
            $("#_FlagsIcon_" + id).removeClass("EditedIcon");
            $("#_FlagsIcon_" + id).addClass("DeletedIcon");
            $("#_btnEdit_" + id).hide("slow");
            $("#_btnDelete_" + id).hide("slow");
            $("#_btnRefresh_" + id).show("slow");
            $("#hdnAction_" + id).val("D");
        });

        $(document).on('click', '[id^=_btnRefresh]', function () {
            try {
                var id = this.id.split("_").slice(-1)[0];
                $("#_FlagsIcon_" + id).removeClass("DeletedIcon EditedIcon");
                $("#_btnDelete_" + id).show("slow");
                $("#_btnEdit_" + id).show("slow");
                $("#_btnRefresh_" + id).hide("slow");
                var ModelCopy = new CountriesHelper(this.Settings).GetModelCopy();
                if (id <= ModelCopy.Countries.length) {
                    $("#_txtCtrCode_" + id).val(ModelCopy.Countries[id - 1].Code);
                    $("#_txtTextName_" + id).val(ModelCopy.Countries[id - 1].Name);
                    $("#_txtCtrNationality_" + id).val(ModelCopy.Countries[id - 1].Name);
                    $("#hdnAction_" + id).val(ModelCopy.Countries[id - 1].Action);
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
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='CtrCode ColHdCode'>Code</div><div class='CtrName ColHdName'>Name</div><div class='CtrNationality ColHdNationality'>Nationality</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            if (this.Model.Countries != null) {
                this.Model.Countries.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<input type='text' class='_txtText CtrCode' readonly='true'  id='_txtCtrCode_" + i + "' value='" + element.Code + "'/>";
                    html += "<input type='text' class='_txtText CtrName' readonly='true' id='_txtTextName_" + i + "' value='" + element.Name + "' />";
                    html += "<input type='text' class='_txtText CtrNationality' readonly='true' id='_txtCtrNationality_" + i + "' value='" + element.Nationality + "' />";
                    html += "<div class='FlagsCol'><div class='_btnEdit Button' id='_btnEdit_" + i + "' title='Edit'/></div>";
                    html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                    html += "<div class='FlagsCol'><div class='_btnRefresh Button'  style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                    html += "<input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='" + element.Action + "'/>";
                    html += "<input type='hidden' class='RowID' id='hdnID_" + i + "' value='" + element.ID + "'/>";
                    html += "</div>";
                    i++;
                });
            } else {
                html = "Error!";
            }
            $("#_lstCountries").html(html);
        }
        catch (Error) {
            new LogHelper(this.Settings).LogError(constructor.name, Error);
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
    catch (Error) {
        alert(Error);
    }
}



