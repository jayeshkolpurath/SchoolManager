'use strict';
class StatesHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("StateCopy", JSON.stringify(Data));
        }
        catch (Ex) {
            throw Ex;
        }
    }
    GetModelCopy() {
        try {
            var objStorage = new StorageHelper();
            var RetVal = JSON.parse(objStorage.Get("StateCopy"));
            return RetVal;
        } catch (Ex) {
            throw Ex;
        }
    }
    SaveData(Data) {
        try {
            var States = [];
            var i = 1;
            $("#_lstStates").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var StateCode = $(this).find(".StateCode").first().val();
                var StateName = $(this).find(".StateName").first().val();
                var CountryCode = $(this).find(".CountryCode").first().val();
                var act = $(this).find(".RowAction").first().val();
                if (isNaN(Id) || (!isNaN(Id) && act != 'D')) {
                    var State = new StateEntry(Id, StateCode, StateName, CountryCode, act);
                    States.push(State);
                }
                i++;
            });
            Data.States = States;
        }
        catch (Ex) {
            throw Ex;
        }
    }
    AddRow(CountriesModel) {
        try {
            var i = $("[id^=_lstRow]").length;
            //row wise textbox count
            var cnt = 2;
            var tabIdx = (i * cnt) + 1;
            var stCountryOptions = ""
            if (CountriesModel !== null && CountriesModel.Countries !== null) {
                CountriesModel.Countries.forEach(element => {
                    stCountryOptions += "<option value='" + element.Code + "'>" + element.Name + "</option>";
                });
            }
            
            if ($("#_txtStateCode_" + i).val().trim() !== '' && $("#_txtStateName_" + i).val().trim() !== '') {
                i++;
                var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
                html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                html += "<div><input type='text' class='_txtText StateCode' id='_txtStateCode_" + i + "' value='' tabindex='" + tabIdx + "'/></div>";
                html += "<div><select class='CountryCode' id='_ddlCountryCode_" + i + "' value='' tabindex='" + tabIdx + "'>";
                html += stCountryOptions + "</select></div> ";
                html += "<div><input type='text' class='_txtText StateName' id='_txtStateName_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div class='FlagsCol'><div class='_btnEdit Button' style='display:none;' id='_btnEdit_" + i + "' title='Edit'/></div>";
                html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                html += "<div><input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/></div>";
                html += "<div><input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/></div>";
                html += "</div >";
                $("#_lstStates").append(html);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
    EditRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_txtStateCode_" + id).prop("readonly", false);
            $("#_txtStateName_" + id).attr("readonly", false);
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
                if ($("#_txtStateCode_" + id).val().trim() == '' || $("#_txtStateName_" + id).val().trim() == '') {
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
                $("#_txtStateCode_" + id).prop("readonly", true);
                $("#_txtStateName_" + id).attr("readonly", true);
            }
            $("#_btnDelete_" + id).show("slow");
            $("#_btnEdit_" + id).show("slow");
            $("#_btnRefresh_" + id).hide("slow");
            var ModelCopy = this.GetModelCopy();
            if (id <= ModelCopy.States.length) {
                $("#_txtStateCode_" + id).val(ModelCopy.States[id - 1].Code);
                $("#_txtStateName_" + id).val(ModelCopy.States[id - 1].Name);
                $("#hdnAction_" + id).val(ModelCopy.States[id - 1].Action);
            } else {
                $("#hdnAction_" + id).val("");
            }
        }
        catch (Ex) {
            throw Ex;
        }
    }
    PopulatePageControls(Model,CountriesModel) {
        try {
            var html = "";
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='StateCode ColHdCode'>Code</div><div class='StateName ColHdName'>Name</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            var tbIndex = i;     
            var stCountryOptions=""
            if (CountriesModel !== null && CountriesModel.Countries !== null) {
                CountriesModel.Countries.forEach(element => {
                    stCountryOptions += "<option value='" + element.Code + "'>" + element.Name +"</option>";
                });
            }

            if (Model != null && Model.States != null) {
                Model.States.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<div><input type='text' class='_txtText StateCode' readonly='true'  id='_txtStateCode_" + i + "' value='" + element.Code + "' tabindex='" + tbIndex + "'/></div>";
                    html += "<div><select class='CountryCode' id='_ddlCountryCode_" + i + "' value='" + element.CountryCode + "' tabindex='" + tbIndex + "'>";
                    var opt = stCountryOptions.replace("value='" + element.CountryCode + "'", "value='" + element.CountryCode + "' selected='selected'");
                    html += opt + "</select></div> ";
                    html += "<div><input type='text' class='_txtText StateName' readonly='true' id='_txtStateName_" + i + "' value='" + element.Name + "' tabindex='" + (tbIndex + 1) + "' /></div>";
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
            $("#_lstStates").html(html);
        }
        catch (Ex) {
            throw Ex;
        }
    }

    TxtFocusOut(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            ($("#_txtStateCode_" + id).val().trim() == '') ? $("#_txtStateCode_" + id).addClass("txtValidationFail") : $("#_txtStateCode_" + id).removeClass("txtValidationFail");
            ($("#_txtStateName_" + id).val().trim() == '') ? $("#_txtStateName_" + id).addClass("txtValidationFail") : $("#_txtStateName_" + id).removeClass("txtValidationFail");
        }
        catch (Ex) {
            throw Ex;
        }
    }
    ValidateData() {
        try {           
            var StateCode = '';
            var StateName = '';
            var status = true;
            $("#_lstStates").children("._lstRow").each(function (idx, item) {
                if ($(this).find(".StateCode").val() == '' || StateCode.includes($(this).find(".StateCode").val() + ',')) {
                    $('#_txtStateCode_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtStateCode_' + (idx + 1)).removeClass("txtValidationFail");
                    StateCode += $(this).find(".StateCode").first().val() + ',';
                }
                if ($(this).find(".StateName").val() == '' || StateName.includes(($(this).find(".StateName").val()))) {
                    $('#_txtStateName_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtStateName_' + (idx + 1)).removeClass("txtValidationFail");
                    StateName += $(this).find(".StateName").first().val() + ',';
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
            var ErrorCount=0;
            if (data != null && data.States != null) {
                data.States.forEach(element => {
                    if (element.Message != '' && element.Message != null && element.Message != undefined) {   
                        ErrorCount++;
                        $("#_lstStates").children("._lstRow").each(function (idx, item) {
                            if ($(this).find(".StateCode").val() == element.code) {
                                $(this).find(".StateCode").css("color", "red");
                            }
                        });
                        msg += '<div>' + element.ID + ' : ' + element.Message + '</div>';
                    }
                });
            }            
            if (msg == '') {
                msg = '<div>Success</div>';
            }
            $('#_saveSuccess .content').empty();
            $('#_saveSuccess .content').append(msg + "Error Count:"+ErrorCount);
            $('#_saveSuccess').show();            
        }        
        catch (Ex) {
            throw Ex;
        }
        return true;
    }
}