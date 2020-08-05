'use strict';
class DepartmentsModel extends ModelBase {
    constructor(Settings) {
        super(Settings);
    }

    Update(Departments) {
        var objDeptsHelper = new DepartmentsHelper(this.Settings);
        objDeptsHelper.Update(Departments);
    }

    GetDepartments() {
        var objDeptsHelper = new DepartmentsHelper(this.Settings);
        var Dept = objDeptsHelper.GetDepartments();
        var Depts = [];
        if (Dept !== null) {
            Dept.forEach(element => {
                Depts.push(new DepartmentEntry(element.ID, element.Code, element.Name, ""));
            });
        }
        return Depts;
    }
}

class DepartmentEntry {
    constructor(ID,Code, Name, Action) {
        this.ID = ID;
        this.Code = Code;
        this.Name = Name;
        this.Action = Action;
    }
}