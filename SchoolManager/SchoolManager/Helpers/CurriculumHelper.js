'use strict';
class CurriculumHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("CurriculumCopy", JSON.stringify(Data));
        }
        catch (Ex) {
            throw Ex;
        }
    }
    GetModelCopy() {
        try {
            var objStorage = new StorageHelper();
            var RetVal = JSON.parse(objStorage.Get("CurriculumCopy"));
            return RetVal;
        } catch (Ex) {
            throw Ex;
        }
    }
    SaveData(Data) {
        try {
            var Curculum = [];
            var i = 1;
            $("#_lstCurriculums").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var CurriCode = $(this).find(".CurCode").first().val();
                var CurriName = $(this).find(".CurName").first().val();
                var act = $(this).find(".RowAction").first().val();
                if (isNaN(Id) || (!isNaN(Id) && act != 'D')) {
                    var Curri = new CurriculumEntry(Id, CurriCode, CurriName,  act);
                    Curculum.push(Curri);
                }
                i++;
            });
            Data.Curriculums = Curculum;
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
            if ($("#_txtCurCode_" + i).val().trim() !== '' && $("#_txtCurName_" + i).val().trim() !== '' ) {
                i++;
                var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
                html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                html += "<div><input type='text' class='_txtText CurCode' id='_txtCurCode_" + i + "' value='' tabindex='" + tabIdx + "'/></div>";
                html += "<div><input type='text' class='_txtText CurName' id='_txtCurName_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div class='FlagsCol'><div class='_btnEdit Button' style='display:none;' id='_btnEdit_" + i + "' title='Edit'/></div>";
                html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                html += "<div><input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/></div>";
                html += "<div><input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/></div>";
                html += "</div >";
                $("#_lstCurriculums").append(html);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
    EditRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_txtCurCode_" + id).prop("readonly", false);
            $("#_txtCurName_" + id).attr("readonly", false);
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
                if ($("#_txtCurCode_" + id).val().trim() == '' || $("#_txtCurName_" + id).val().trim() == '' ) {
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
                $("#_txtCurCode_" + id).prop("readonly", true);
                $("#_txtCurName_" + id).attr("readonly", true);
             }
            $("#_btnDelete_" + id).show("slow");
            $("#_btnEdit_" + id).show("slow");
            $("#_btnRefresh_" + id).hide("slow");
            var ModelCopy = this.GetModelCopy();
            if (id <= ModelCopy.Curriculums.length) {
                $("#_txtCurCode_" + id).val(ModelCopy.Curriculums[id - 1].Code);
                $("#_txtCurName_" + id).val(ModelCopy.Curriculums[id - 1].Name);
                $("#hdnAction_" + id).val(ModelCopy.Curriculums[id - 1].Action);
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
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='CurCode ColHdCode'>Code</div><div class='CurName ColHdName'>Name</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            var tbIndex = i;
            if (Model.Curriculums != null) {
                Model.Curriculums.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<div><input type='text' class='_txtText CurCode' readonly='true'  id='_txtCurCode_" + i + "' value='" + element.Code + "' tabindex='" + tbIndex + "'/></div>";
                    html += "<div><input type='text' class='_txtText CurName' readonly='true' id='_txtCurName_" + i + "' value='" + element.Name + "' tabindex='" + (tbIndex + 1) + "' /></div>";
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
            $("#_lstCurriculums").html(html);
        }
        catch (Ex) {
            throw Ex;
        }
    }
    TxtFocusOut(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            ($("#_txtCurCode_" + id).val().trim() == '') ? $("#_txtCurCode_" + id).addClass("txtValidationFail") : $("#_txtCurCode_" + id).removeClass("txtValidationFail");
            ($("#_txtCurName_" + id).val().trim() == '') ? $("#_txtCurName_" + id).addClass("txtValidationFail") : $("#_txtCurName_" + id).removeClass("txtValidationFail");
            }
        catch (Ex) {
            throw Ex;
        }
    }
    ValidateData() {
        try {
            var CurCode = '';
            var CurName = '';
            var status = true;
            $("#_lstCurriculums").children("._lstRow").each(function (idx, item) {
                if ($(this).find(".CurCode").val() == '' || CurCode.includes($(this).find(".CurCode").val() + ',')) {
                    $('#_txtCurCode_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurCode_' + (idx + 1)).removeClass("txtValidationFail");
                    CurCode += $(this).find(".CurCode").first().val() + ',';
                }
                if ($(this).find(".CurName").val() == '' || CurName.includes(($(this).find(".CurName").val()))) {
                    $('#_txtCurName_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtCurName_' + (idx + 1)).removeClass("txtValidationFail");
                    CurName += $(this).find(".CurName").first().val() + ',';
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
            if (data != null && data.Curriculums != null) {
                data.Curriculums.forEach(element => {
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