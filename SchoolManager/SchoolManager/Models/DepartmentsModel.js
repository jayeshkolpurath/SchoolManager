'use strict';
class DepartmentsModel extends ModelBase {
    constructor() {
        super();
    }

    Update(Departments) {
        var objDeptsHelper = new DepartmentsHelper();
        objDeptsHelper.Update(Departments);
    }

    GetDepartments() {
        var objDeptsHelper = new DepartmentsHelper();
        var Dept = objDeptsHelper.GetDepartments();
        var Depts = [];
        if (Dept !== undefined) {
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