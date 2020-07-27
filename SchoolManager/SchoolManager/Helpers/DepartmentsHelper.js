class DepartmentsHelper extends HelperBase {
    constructor() {
        super();
    }
    static GetDepartments() {
        return [
            { ID: "1", Name: "English" },
            { ID: "2", Name: "Mathematics" },
            { ID: "3", Name: "Chemistry" },
            { ID: "4", Name: "Physics" },
            { ID: "5", Name: "Biology" },
            { ID: "6", Name: "Hindi" },
            { ID: "7", Name: "Sports" }
        ]
    }
}