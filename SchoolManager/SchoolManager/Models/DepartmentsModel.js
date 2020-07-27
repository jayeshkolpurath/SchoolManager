class DepartmentsModel extends ModelBase {
    constructor(Departments) {
        super();
        this.Departments = Departments;
    }
    Update() {
        Departments.forEach(element => {
            switch (element.Action) {
                case "A":
                    break;
                case "E":
                    break;
                case "D":
                    break;
            }
        });
    }
    static Get() {
        var Dept = DepartmentsHelper.GetDepartments();
        var Departments = [];
        Dept.forEach(element => {
            Departments.push(new DepartmentEntry(element.ID, element.Name, ""));
        });
        return Departments;
    }
}

class DepartmentEntry {
    constructor(ID, Name, Action) {
        this.ID = ID;
        this.Name = Name;
        this.Action = Action;
    }
}