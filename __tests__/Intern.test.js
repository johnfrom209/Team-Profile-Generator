const Intern = require("../lib/intern");

describe("Intern", () => {
    describe("construct", () => {
        it("Should construct an obj that has name, id, email, role", () => {
            let employee3 = new Intern("Dexter", 2, "dexters11@gmail.com", "dexterShow");

            expect(employee3.name).toEqual("Dexter")
            expect(employee3.id).toEqual(2);
            expect(employee3.getEmail()).toEqual("dexters11@gmail.com")
            expect(employee3.getSchool()).toEqual("dexterShow")
            expect(employee3.getRole()).toEqual("Intern")
        })
    })

})