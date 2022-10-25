const Employee = require("../lib/employee");

describe("Employee", () => {
    describe("construct", () => {
        it("Should construct an obj that has name, id, email, role", () => {

            let joe = new Employee("Joe", 2, "joe777@gmail.com");

            expect(joe.name).toEqual("Joe")
            expect(joe.id).toEqual(2);
            expect(joe.getEmail()).toEqual("joe777@gmail.com")
            expect(joe.getRole()).toEqual("Employee")
        })
    })

})