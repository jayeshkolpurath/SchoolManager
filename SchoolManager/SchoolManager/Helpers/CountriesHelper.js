'use strict';
class CountriesHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }    
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("CountryCopy", JSON.stringify(Data));
        }
        catch (Ex) {
            throw Ex;
        }
    }
    GetModelCopy() {
        try {
            var objStorage = new StorageHelper();
            var RetVal = JSON.parse(objStorage.Get("CountryCopy"));
            return RetVal;
        } catch (Ex) {
            throw Ex;
        }
    }
    SaveData(Data) {
        try {
            var Cotries = [];
            var i = 1;
            $("#_lstCountries").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var CtryCode = $(this).find(".CtrCode").first().val();
                var CtryName = $(this).find(".CtrName").first().val();
                var CtryNationality = $(this).find(".CtrNationality").first().val();
                var act = $(this).find(".RowAction").first().val();
                if (isNaN(Id) || (!isNaN(Id) && act != 'D')) {
                    var Ctry = new CountryEntry(Id, CtryCode, CtryName, CtryNationality, act);
                    Cotries.push(Ctry);
                }
                i++;
            });
            Data.Countries = Cotries;
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
            if ($("#_txtCtrCode_" + i).val().trim() !== '' && $("#_txtCtrName_" + i).val().trim() !== '' && $("#_txtCtrNationality_" + i).val().trim() !== '') {
                i++;
                var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
                html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                html += "<div><input type='text' class='_txtText CtrCode' id='_txtCtrCode_" + i + "' value='' tabindex='" + tabIdx + "'/></div>";
                html += "<div><input type='text' class='_txtText CtrName' id='_txtCtrName_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div><input type='text' class='_txtText CtrNationality' id='_txtCtrNationality_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div class='FlagsCol'><div class='_btnEdit Button' style='display:none;' id='_btnEdit_" + i + "' title='Edit'/></div>";
                html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                html += "<div><input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/></div>";
                html += "<div><input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/></div>";
                html += "</div >";
                $("#_lstCountries").append(html);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
    EditRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_txtCtrCode_" + id).prop("readonly", false);
            $("#_txtCtrName_" + id).attr("readonly", false);
            $("#_txtCtrNationality_" + id).attr("readonly", false);
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
                if ($("#_txtCtrCode_" + id).val().trim() == '' || $("#_txtCtrName_" + id).val().trim() == '' || $("#_txtCtrNationality_" + id).val().trim() == '') {
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
                $("#_txtCtrCode_" + id).prop("readonly", true);
                $("#_txtCtrName_" + id).attr("readonly", true);
                $("#_txtCtrNationality_" + id).attr("readonly", true);
            }
            $("#_btnDelete_" + id).show("slow");
            $("#_btnEdit_" + id).show("slow");
            $("#_btnRefresh_" + id).hide("slow");
            var ModelCopy = this.GetModelCopy();
            if (id <= ModelCopy.Countries.length) {
                $("#_txtCtrCode_" + id).val(ModelCopy.Countries[id - 1].Code);
                $("#_txtCtrName_" + id).val(ModelCopy.Countries[id - 1].Name);
                $("#_txtCtrNationality_" + id).val(ModelCopy.Countries[id - 1].Nationality);
                $("#hdnAction_" + id).val(ModelCopy.Countries[id - 1].Action);
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
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='CtrCode ColHdCode'>Code</div><div class='CtrName ColHdName'>Name</div><div class='CtrNationality ColHdNationality'>Nationality</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            var tbIndex = i;           
            if (Model.Countries != null) {
                Model.Countries.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<div><input type='text' class='_txtText CtrCode' readonly='true'  id='_txtCtrCode_" + i + "' value='" + element.Code + "' tabindex='" + tbIndex + "'/></div>";
                    html += "<div><input type='text' class='_txtText CtrName' readonly='true' id='_txtCtrName_" + i + "' value='" + element.Name + "' tabindex='" + (tbIndex + 1) + "' /></div>";
                    html += "<div><input type='text' class='_txtText CtrNationality' readonly='true' id='_txtCtrNationality_" + i + "' value='" + element.Nationality + "' tabindex='" + (tbIndex + 1) + "' /></div>";
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
            $("#_lstCountries").html(html);
        }
        catch (Ex) {
            throw Ex;
        }
    }
    TxtFocusOut(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            ($("#_txtCtrCode_" + id).val().trim() == '') ? $("#_txtCtrCode_" + id).addClass("txtValidationFail") : $("#_txtCtrCode_" + id).removeClass("txtValidationFail");
            ($("#_txtCtrName_" + id).val().trim() == '') ? $("#_txtCtrName_" + id).addClass("txtValidationFail") : $("#_txtCtrName_" + id).removeClass("txtValidationFail");
            ($("#_txtCtrNationality_" + id).val().trim() == '') ? $("#_txtCtrNationality_" + id).addClass("txtValidationFail") : $("#_txtCtrNationality_" + id).removeClass("txtValidationFail");
        }
        catch (Ex) {
            
            throw Ex;
        }
    }
    ValidateData() {
        try {
            var CtrCode = '';
            var CtrName = '';
            var CtrNationality = '';
            var status = true;
            $("#_lstCountries").children("._lstRow").each(function (idx, item) {
                if ($(this).find(".CtrCode").val() == '' || CtrCode.includes($(this).find(".CtrCode").val() + ',')) {
                    $('#_txtCtrCode_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCtrCode_' + (idx + 1)).removeClass("txtValidationFail");
                    CtrCode += $(this).find(".CtrCode").first().val() + ',';
                }
                if ($(this).find(".CtrName").val() == '' || CtrName.includes(($(this).find(".CtrName").val()))) {
                    $('#_txtCtrName_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCtrName_' + (idx + 1)).removeClass("txtValidationFail");
                    CtrName += $(this).find(".CtrName").first().val() + ',';
                }
                if ($(this).find(".CtrNationality").val() == '' || CtrNationality.includes(($(this).find(".CtrNationality").val()))) {
                    $('#_txtCtrNationality_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCtrNationality_' + (idx + 1)).removeClass("txtValidationFail");
                    CtrNationality += $(this).find(".CtrNationality").first().val() + ',';
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
            if (data != null && data.Countries != null) {
                data.Countries.forEach(element => {
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