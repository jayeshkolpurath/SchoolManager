'use strict';
class DepartmentsHelper extends HelperBase {
    constructor(Settings) {
        super(Settings);
    }
    SaveModelCopy(Data) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("ModelCopy", JSON.stringify(Data));
        }
        catch (Ex) {
            throw Ex;
        }
    }
    GetModelCopy() {
        try {
            var objStorage = new StorageHelper();
            var RetVal = JSON.parse(objStorage.Get("ModelCopy"));
            return RetVal;
        } catch (Ex) {
            throw Ex;
        }
    }
    SaveData(Data) {
        try {
            var Depts = [];
            var i = 1;
            $("#_lstDepartments").children("._lstRow").each(function () {
                var Id = $(this).find(".RowID").first().val();
                var DeptCode = $(this).find(".DepCode").first().val();
                var DeptName = $(this).find(".DepName").first().val();
                var act = $(this).find(".RowAction").first().val();
                var Dept = new DepartmentEntry(Id, DeptCode, DeptName, act);
                Depts.push(Dept);
                i++;
            });
            Data.Departments = Depts;
            Data.UpdateDepartments();
        }
        catch (Ex) {
            throw Ex;
        }
    }
    AddRow() {
        try {
            var i = $("[id^=_lstRow]").length;
            if ($("#_txtDepCode_" + i).val() !== '') {
                i++;
                var html = "<div class='_lstRow' id='_lstRow_" + i + "'>";
                html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                html += "<input type='text' class='_txtText DepCode' id='_txtDepCode_" + i + "' value=''/>";
                html += "<input type='text' class='_txtText DepName' id='_txtTextName_" + i + "' value='' />";
                html += "<div class='FlagsCol'><div class='_btnEdit Button' style='display:none;' id='_btnEdit_" + i + "' title='Edit'/></div>";
                html += "<div class='FlagsCol'><div class='_btnDelete Button' id='_btnDelete_" + i + "' title='Delete'/></div>";
                html += "<div class='FlagsCol'><div class='_btnRefresh Button' style='display:none;' id='_btnRefresh_" + i + "' title='Refresh' /></div>";
                html += "<input type='hidden' class='RowAction' id='hdnAction_" + i + "' value='A'/>";
                html += "<input type='hidden' class='RowID' id='hdnID_" + i + "' value=''/>";
                html += "</div >";
                $("#_lstDepartments").append(html);
            }
        } catch (Ex) {
            throw Ex;
        }
    }
    EditRow(ElementID) {
        try {
            var id = ElementID.split("_").slice(-1)[0];
            $("#_txtDepCode_" + id).prop("readonly", false);
            $("#_txtTextName_" + id).attr("readonly", false);
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
            $("#_btnDelete_" + id).show("slow");
            $("#_btnEdit_" + id).show("slow");
            $("#_btnRefresh_" + id).hide("slow");
            var ModelCopy = this.GetModelCopy();
            if (id <= ModelCopy.Departments.length) {
                $("#_txtDepCode_" + id).val(ModelCopy.Departments[id - 1].Code);
                $("#_txtTextName_" + id).val(ModelCopy.Departments[id - 1].Name);
                $("#hdnAction_" + id).val(ModelCopy.Departments[id - 1].Action);
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
            html += "<div class='_lstHead'><div class='FlagsCol'/><div class='DepCode ColHdCode'>Code</div><div class='DepName ColHdName'>Name</div><div class='FlagsCol'/><div class='FlagsCol'/></div>";
            var i = 1;
            if (Model.Departments != null) {
                Model.Departments.forEach(element => {
                    html += "<div class='_lstRow' id='_lstRow_" + i + "'>";
                    html += "<div class='FlagsCol'><div class='NoIcon' id='_FlagsIcon_" + i + "'/></div>";
                    html += "<input type='text' class='_txtText DepCode' readonly='true'  id='_txtDepCode_" + i + "' value='" + element.Code + "'/>";
                    html += "<input type='text' class='_txtText DepName' readonly='true' id='_txtTextName_" + i + "' value='" + element.Name + "' />";
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
            $("#_lstDepartments").html(html);
        }
        catch (Ex) {
            throw Ex;
        }
    }
}