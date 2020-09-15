'use strict';
class CurrencyHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("CurrencyCopy", JSON.stringify(Data));
        }
        catch (Ex) {
            throw Ex;
        }
    }
    GetModelCopy() {
        try {
            var objStorage = new StorageHelper();
            var RetVal = JSON.parse(objStorage.Get("CurrencyCopy"));
            return RetVal;
        } catch (Ex) {
            throw Ex;
        }
    }
    SaveData(Data) {
        try {
            var Currcy = [];
            var i = 1;
            $("#_lstCurrency").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var CurryCode = $(this).find(".CurrCode").first().val();
                var CurryName = $(this).find(".CurrName").first().val();
                var CurryBasecurrency = $(this).find(".CurrBasecurrency").first().val();
                var CurryPrecisions = $(this).find(".CurrPrecisions").first().val();
                var CurryStats = $(this).find(".CurrStats").first().val();
                var act = $(this).find(".RowAction").first().val();
                if (isNaN(Id) || (!isNaN(Id) && act != 'D')) {
                    var Curr = new CurrencyEntry(Id, CurryCode, CurryName, CurryBasecurrency, CurryPrecisions, CurryStats, act);
                    Currcy.push(Curr);
                }
                i++;
            });
            Data.Currency = Currcy;
        }
        catch (Ex) {
            throw Ex;
        }
    }
    AddRow() {
        try {
            var i = $("[id^=_lstRow]").length;
            //row wise textbox count
            var cnt = 2;
            var tabIdx = (i * cnt) + 1;
            if ($("#_txtCurrCode_" + i).val().trim() !== '' && $("#_txtCurrName_" + i).val().trim() !== '' && $("#_txtCurrBasecurrency_" + i).val().trim() !== '' && $("#_txtCurrPrecisions_" + i).val().trim() !== '' && $("#_txtCurrStats_" + i).val().trim() !== '') {
                i++;
                var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
                html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                html += "<div><input type='text' class='_txtText CurrCode' id='_txtCurrCode_" + i + "' value='' tabindex='" + tabIdx + "'/></div>";
                html += "<div><input type='text' class='_txtText CurrName' id='_txtCurrName_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div><input type='text' class='_txtText CurrBasecurrency' id='_txtCurrBasecurrency_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div><input type='text' class='_txtText CurrPrecisions' id='_txtCurrPrecisions_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div><input type='text' class='_txtText CurrStats' id='_txtCurrStats_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div class='FlagsCol'><div class='_btnEdit Button' style='display:none;' id='_btnEdit_" + i + "' title='Edit'/></div>";
                html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                html += "<div><input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/></div>";
                html += "<div><input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/></div>";
                html += "</div >";
                $("#_lstCurrency").append(html);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
    EditRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_txtCurrCode_" + id).prop("readonly", false);
            $("#_txtCurrName_" + id).attr("readonly", false);
            $("#_txtCurrBasecurrency_" + id).attr("readonly", false);
            $("#_txtCurrPrecisions_" + id).attr("readonly", false);
            $("#_txtCurrStats_" + id).attr("readonly", false);
            $("#_FlagsIcon_" + id).addClass("EditedIcon");
            $("#_btnEdit_" + id).hide("slow");
            $("#_btnRefresh_" + id).show("slow");
            $("#hdnAction_" + id).val("E");
        } catch (Ex) {
            throw Ex;
        }
    }
    DeleteRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            if (!isNaN($("#hdnID_" + id).val())) {
                if ($("#_txtCurrCode_" + id).val().trim() == '' || $("#_txtCurrName_" + id).val().trim() == '' || $("#_txtCurrBasecurrency_" + id).val().trim() == '' || $("#_txtCurrPrecisions_" + id).val().trim() == '' || $("#_txtCurrStats_" + id).val().trim() == '') {
                    return false;
                }
            }
            $("#_FlagsIcon_" + id).removeClass("EditedIcon");
            $("#_FlagsIcon_" + id).addClass("DeletedIcon");
            $("#_btnEdit_" + id).hide("slow");
            $("#_btnDelete_" + id).hide("slow");
            $("#_btnRefresh_" + id).show("slow");
            $("#hdnAction_" + id).val("D");
        } catch (Ex) {
            throw Ex;
        }
    }
    RefreshRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_FlagsIcon_" + id).removeClass("DeletedIcon EditedIcon");
            if (isNaN($("#hdnID_" + id).val())) {
                $("#_txtCurrCode_" + id).prop("readonly", true);
                $("#_txtCurrName_" + id).attr("readonly", true);
                $("#_txtCurrBasecurrency_" + id).attr("readonly", true);
                $("#_txtCurrPrecisions_" + id).attr("readonly", true);
                $("#_txtCurrStats_" + id).attr("readonly", true);
            }
            $("#_btnDelete_" + id).show("slow");
            $("#_btnEdit_" + id).show("slow");
            $("#_btnRefresh_" + id).hide("slow");
            var ModelCopy = this.GetModelCopy();
            if (id <= ModelCopy.Currency.length) {
                $("#_txtCurrCode_" + id).val(ModelCopy.Currency[id - 1].Code);
                $("#_txtCurrName_" + id).val(ModelCopy.Currency[id - 1].Name);
                $("#_txtCurrBasecurrency_" + id).val(ModelCopy.Currency[id - 1].Basecurrency);
                $("#_txtCurrPrecisions_" + id).val(ModelCopy.Currency[id - 1].Precisions);
                $("#_txtCurrStats_" + id).val(ModelCopy.Currency[id - 1].Stats);
                $("#hdnAction_" + id).val(ModelCopy.Currency[id - 1].Action);
            } else {
                $("#hdnAction_" + id).val("");
            }
        }
        catch (Ex) {
            throw Ex;
        }
    }
    PopulatePageControls(Model) {
        try {
            var html = "";
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='CurrCode ColHdCode'>Code</div><div class='CurrName ColHdName'>Name</div><div class='CurrBasecurrency ColHdBasecurrency'>Basecurrency</div><div class='CurrPrecisions ColHdPrecisions'>Precisions</div><div class='CurrStats ColHdStats'>Stats</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            var tbIndex = i;
            if (Model.Currency != null) {
                Model.Currency.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<div><input type='text' class='_txtText CurrCode' readonly='true'  id='_txtCurrCode_" + i + "' value='" + element.Code + "' tabindex='" + tbIndex + "'/></div>";
                    html += "<div><input type='text' class='_txtText CurrName' readonly='true' id='_txtCurrName_" + i + "' value='" + element.Name + "' tabindex='" + (tbIndex + 1) + "' /></div>";
                    html += "<div><input type='text' class='_txtText CurrBasecurrency' readonly='true' id='_txtCurrBasecurrency_" + i + "' value='" + element.Basecurrency + "' tabindex='" + (tbIndex + 1) + "' /></div>";
                    html += "<div><input type='text' class='_txtText CurrPrecisions' readonly='true' id='_txtCurrPrecisions_" + i + "' value='" + element.Precisions + "' tabindex='" + (tbIndex + 1) + "' /></div>";
                    html += "<div><input type='text' class='_txtText CurrStats' readonly='true' id='_txtCurrStats_" + i + "' value='" + element.Stats + "' tabindex='" + (tbIndex + 1) + "' /></div>";
                    html += "<div class='FlagsCol'><div class='_btnEdit Button' id='_btnEdit_" + i + "' title='Edit'/></div>";
                    html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                    html += "<div class='FlagsCol'><div class='_btnRefresh Button'  style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                    html += "<div><input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='" + element.Action + "'/></div>";
                    html += "<div><input type='hidden' class='RowID' id='hdnID_" + i + "' value='" + element.ID + "'/></div>";
                    html += "</div>";
                    i++;
                    tbIndex += 2;
                });
            } else {
                html = "Error!";
            }
            $("#_lstCurrency").html(html);
        }
        catch (Ex) {
            throw Ex;
        }
    }
    TxtFocusOut(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            ($("#_txtCurrCode_" + id).val().trim() == '') ? $("#_txtCurrCode_" + id).addClass("txtValidationFail") : $("#_txtCurrCode_" + id).removeClass("txtValidationFail");
            ($("#_txtCurrName_" + id).val().trim() == '') ? $("#_txtCurrName_" + id).addClass("txtValidationFail") : $("#_txtCurrName_" + id).removeClass("txtValidationFail");
            ($("#_txtCurrBasecurrency_" + id).val().trim() == '') ? $("#_txtCurrBasecurrency_" + id).addClass("txtValidationFail") : $("#_txtCurrBasecurrency_" + id).removeClass("txtValidationFail");
            ($("#_txtCurrPrecisions_" + id).val().trim() == '') ? $("#_txtCurrPrecisions_" + id).addClass("txtValidationFail") : $("#_txtCurrPrecisions_" + id).removeClass("txtValidationFail");
            ($("#_txtCurrStats_" + id).val().trim() == '') ? $("#_txtCurrStats_" + id).addClass("txtValidationFail") : $("#_txtCurrStats_" + id).removeClass("txtValidationFail");
        }
        catch (Ex) {
            throw Ex;
        }
    }
    ValidateData() {
        try {
            var CurrCode = '';
            var CurrName = '';
            var CurrBasecurrency = '';
            var CurrPrecisions = '';
            var CurrStats = '';
            var status = true;
            $("#_lstCurrency").children("._lstRow").each(function (idx, item) {
                if ($(this).find(".CurrCode").val() == '' || CurrCode.includes($(this).find(".CurrCode").val() + ',')) {
                    $('#_txtCurrCode_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurrCode_' + (idx + 1)).removeClass("txtValidationFail");
                    CurrCode += $(this).find(".CurrCode").first().val() + ',';
                }
                if ($(this).find(".CurrName").val() == '' || CurrName.includes(($(this).find(".CurrName").val()))) {
                    $('#_txtCurrName_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurrName_' + (idx + 1)).removeClass("txtValidationFail");
                    CurrName += $(this).find(".CurrName").first().val() + ',';
                }
                if ($(this).find(".CurrBasecurrency").val() == '' || CurrBasecurrency.includes(($(this).find(".CurrBasecurrency").val()))) {
                    $('#_txtCurrBasecurrency_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurrBasecurrency_' + (idx + 1)).removeClass("txtValidationFail");
                    CurrBasecurrency += $(this).find(".CurrBasecurrency").first().val() + ',';
                }
                if ($(this).find(".CurrPrecisions").val() == '' || CurrPrecisions.includes(($(this).find(".CurrPrecisions").val()))) {
                    $('#_txtCurrPrecisions_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurrPrecisions_' + (idx + 1)).removeClass("txtValidationFail");
                    CurrPrecisions += $(this).find(".CurrPrecisions").first().val() + ',';
                }
                if ($(this).find(".CurrStats").val() == '' || CurrStats.includes(($(this).find(".CurrStats").val()))) {
                    $('#_txtCurrStats_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurrStats_' + (idx + 1)).removeClass("txtValidationFail");
                    CurrStats += $(this).find(".CurrStats").first().val() + ',';
                }
            });
            return status;
        }
        catch (Ex) {
            throw Ex;
        }
    }
    ShowSavedAction(data) {
        try {
            var msg = '';
            if (data != null && data.Currency != null) {
                data.Currency.forEach(element => {
                    if (element.Message != '' && element.Message != null && element.Message != undefined) {
                        msg += '<div>' + element.ID + ' : ' + element.Message + '</div>';
                    }
                });
            }
            if (msg == '') {
                msg = '<div>Success</div>';
            }
            $('#_saveSuccess .content').empty();
            $('#_saveSuccess .content').append(msg);
            $('#_saveSuccess').show();
        }
        catch (Ex) {
            throw Ex;
        }
        return true;
    }
}