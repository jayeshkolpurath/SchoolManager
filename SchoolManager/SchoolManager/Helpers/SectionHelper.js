'use strict';
class SectionHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("SectionCopy", JSON.stringify(Data));
        }
        catch (Ex) {
            throw Ex;
        }
    }
    GetModelCopy() {
        try {
            var objStorage = new StorageHelper();
            var RetVal = JSON.parse(objStorage.Get("SectionCopy"));
            return RetVal;
        } catch (Ex) {
            throw Ex;
        }
    }
    SaveData(Data) {
        try {
            var Items = [];
            var i = 1;
            $("#_lstSection").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var Code = $(this).find(".SecCode").first().val();
                var Name = $(this).find(".SecName").first().val();
                var act = $(this).find(".RowAction").first().val();
                if (isNaN(Id) || (!isNaN(Id) && act != 'D')) {
                    var Item = new SectionEntry(Id, Code, Name, act);
                    Items.push(Item);
                }
                i++;
            });
            Data.Sections = Items;
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
            if (i==0 || ($("#_txtSecCode_" + i).val().trim() !== '' && $("#_txtSecName_" + i).val().trim() !== '')) {
                i++;
                var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
                html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                html += "<div><input type='text' class='_txtText SecCode' id='_txtSecCode_" + i + "' value='' tabindex='" + tabIdx + "'/></div>";
                html += "<div><input type='text' class='_txtText SecName' id='_txtSecName_" + i + "' value='' tabindex='" + (tabIdx + 1) + "' /></div>";
                html += "<div class='FlagsCol'><div class='_btnEdit Button' style='display:none;' id='_btnEdit_" + i + "' title='Edit'/></div>";
                html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                html += "<div><input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/></div>";
                html += "<div><input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/></div>";
                html += "</div >";
                $("#_lstSection").append(html);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
    EditRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_txtSecCode_" + id).prop("readonly", false);
            $("#_txtSecName_" + id).attr("readonly", false);
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
                if ($("#_txtSecCode_" + id).val().trim() == '' || $("#_txtSecName_" + id).val().trim() == '') {
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
                $("#_txtSecCode_" + id).prop("readonly", true);
                $("#_txtSecName_" + id).attr("readonly", true);
            }
            $("#_btnDelete_" + id).show("slow");
            $("#_btnEdit_" + id).show("slow");
            $("#_btnRefresh_" + id).hide("slow");
            var ModelCopy = this.GetModelCopy();
            if (id <= ModelCopy.Sections.length) {
                $("#_txtSecCode_" + id).val(ModelCopy.Sections[id - 1].Code);
                $("#_txtSecName_" + id).val(ModelCopy.Sections[id - 1].Name);
                $("#hdnAction_" + id).val(ModelCopy.Sections[id - 1].Action);
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
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='SecCode ColHdCode'>Code</div><div class='SecName ColHdName'>Name</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            var tbIndex = i;            
            if (Model.Sections != null) {
                Model.Sections.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<div><input type='text' class='_txtText SecCode' readonly='true'  id='_txtSecCode_" + i + "' value='" + element.Code + "' tabindex='" + tbIndex + "'/></div>";
                    html += "<div><input type='text' class='_txtText SecName' readonly='true' id='_txtSecName_" + i + "' value='" + element.Name + "' tabindex='" + (tbIndex + 1) + "' /></div>";
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
            $("#_lstSection").html(html);
        }
        catch (Ex) {
            throw Ex;
        }
    }

    TxtFocusOut(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            console.log("ElementID :" + ElementID + " Id :" + id);
            ($("#_txtSecCode_" + id).val().trim() == '') ? $("#_txtSecCode_" + id).addClass("txtValidationFail") : $("#_txtSecCode_" + id).removeClass("txtValidationFail");
            ($("#_txtSecName_" + id).val().trim() == '') ? $("#_txtSecName_" + id).addClass("txtValidationFail") : $("#_txtSecName_" + id).removeClass("txtValidationFail");
        }
        catch (Ex) {
            throw Ex;
        }
    }
    ValidateData() {
        try {           
            var Code = '';
            var Name = '';
            var status = true;
            $("#_lstSection").children("._lstRow").each(function (idx, item) {
                if ($(this).find(".SecCode").val() == '' || Code.includes($(this).find(".SecCode").val() + ',')) {
                    $('#_txtSecCode_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtSecCode_' + (idx + 1)).removeClass("txtValidationFail");
                    Code += $(this).find(".SecCode").first().val() + ',';
                }
                if ($(this).find(".SecName").val() == '' || Name.includes(($(this).find(".SecName").val()))) {
                    $('#_txtSecName_' + (idx + 1)).addClass("txtValidationFail");
                    status = false;
                }
                else {
                    $('#_txtSecName_' + (idx + 1)).removeClass("txtValidationFail");
                    Name += $(this).find(".SecName").first().val() + ',';
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
            if (data != null && data.Sections != null) {
                data.Sections.forEach(element => {
                    if (element.Message != '' && element.Message != null && element.Message != undefined) {   
                        ErrorCount++;
                        $("#_lstSection").children("._lstRow").each(function (idx, item) {
                            if ($(this).find(".SecCode").val() == element.code) {
                                $(this).find(".SecCode").css("color", "red");
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