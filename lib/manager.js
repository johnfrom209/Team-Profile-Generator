const Employee = require('./employee');

class Manager {
    constructor(name, id, email, officeNumb) {
        this.role = "Manager";
        this.officeNumber = officeNumb;

        super(name, id, email);
        this.name = name;
        this.id = id;
        this.email = email;
    }
    getRole() {
        return this.role;
    }
}