const Engineer = require("../lib/engineer.js");

describe("Engineer", () => {
    describe("construct", () => {
        it("Should construct an obj that has name, id, email, role", () => {
            let employee5 = new Engineer("Sarah", 2, "sarah999@gmail.com", "sarahFlex");

            expect(employee5.name).toEqual("Sarah")
            expect(employee5.id).toEqual(2);
            expect(employee5.getEmail()).toEqual("sarah999@gmail.com")
            expect(employee5.getGithub()).toEqual("sarahFlex")
            expect(employee5.getRole()).toEqual("Engineer")
        })
    })

})