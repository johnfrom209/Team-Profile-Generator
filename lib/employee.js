// the base class for construction
class Employee {
    constructor(name, id, email) {
        this.role = "Employee";
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Employee";
    }
}


module.exports = Employee;