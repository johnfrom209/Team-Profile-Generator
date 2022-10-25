const Manager = require("../lib/manager");

describe("Manager", () => {
    describe("construct", () => {
        it("Should construct an obj that has name, id, email, role", () => {
            let employee1 = new Manager("Dolly", 2, "dolly4life@gmail.com", "206-999-5941");

            expect(employee1.name).toEqual("Dolly")
            expect(employee1.id).toEqual(2);
            expect(employee1.email).toEqual("dolly4life@gmail.com")
            expect(employee1.officeNumber).toEqual("206-999-5941")
            expect(employee1.getRole()).toEqual("Manager")
        })
    })

})