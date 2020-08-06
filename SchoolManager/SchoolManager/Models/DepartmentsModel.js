'use strict';
class DepartmentsModel extends ModelBase {
    Departments = [];
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
        return Dept;
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