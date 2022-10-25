const Employee = require('./employee');

class Engineer {
    constructor(name, id, email, github) {
        this.github = github;

        super(name, id, email)
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer"
    }
}