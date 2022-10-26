const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/manager.js');
const Engineer = require('./lib/engineer.js');
const Intern = require('./lib/intern.js');

let setAnswers
let company = [];

let employeeQuestions = [
    {
        type: 'list',
        name: 'employeeType',
        message: 'What kinda of employee do you want to add?',
        choices: [
            'Manager',
            'Engineer',
            'Intern',
            'Exit'
        ]
    },
    {
        name: 'name',
        message: 'Name of the employee',
        when: (answers) => answers.employeeType !== 'Exit'
    },
    {
        name: 'id',
        message: 'Employee ID',
        when: (answers) => answers.employeeType !== 'Exit'
    },
    {
        name: 'email',
        message: 'Employee email',
        when: (answers) => answers.employeeType !== 'Exit'
    },
    {
        name: 'officeNumber',
        message: 'Employee office number',
        when: (answers) => answers.employeeType === 'Manager'
    },
    {
        name: 'github',
        message: 'Engineers Github',
        when: (answers) => answers.employeeType === 'Engineer'
    },
    {
        name: 'school',
        message: 'What school is the intern attending?',
        when: (answers) => answers.employeeType === 'Intern'
    }
]

function addEmployee() {

    inquirer
        .prompt(employeeQuestions)
        .then(answers => {
            setAnswers = answers;
            if (answers.employeeType === 'Manager') {
                const temp1 = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                company.push(temp1)
                addEmployee();
            }
            else if (answers.employeeType === 'Engineer') {
                const temp2 = new Engineer(answers.name, answers.id, answers.email, answers.github)
                company.push(temp2)
                addEmployee();
            }
            else if (answers.employeeType === 'Intern') {
                const temp3 = new Intern(answers.name, answers.id, answers.email, answers.school)
                company.push(temp3)
                addEmployee();

            }
            else {
                // send company to create html page
                writetoFile("index.html", generateEmployeeCard(company));
            }
        })
}


function chick() {
    addEmployee();
}

chick();

function writetoFile(name, array) {

    fs.writeFile(name, array, (err) =>
        err ? console.log(err) : console.log('Successfully created GENERATED-README.me!'))
}

let results;

function generateEmployeeCard(data) {

    results = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="./dist/style.css">
    <title>Team Profile</title>
</head>

<body>

    <div class="jumbotron text-center">
        <h1 class="display-4">Team Info</h1>
    </div>

    <div class="row w-100">
        <div class="col-12 d-inline-flex  justify-content-center">`

    data.forEach(function (employee) {
        // I hate doing this its so dry but time is ticking
        if (employee.getRole() === "Manager") {
            results += `
                <div class="card col-2 p-0">
                    <h5 class="card-header heading">${employee.name}</h5>
                    <div class="card-body ">
                        <h6 class="card-title">ID: ${employee.id}</h6>
                        <h6 class="card-title">Email: <a href = "mailto:${employee.email}">${employee.email}</a></h6 >
                        <h6 class="card-title">Office number:${employee.officeNumber}</h6>
                    </div >
                </div >
        `
        }
        else if (employee.getRole() === "Engineer") {
            results += `
                 <div class="card col-2 p-0">
                    <h5 class="card-header heading">${employee.name}</h5>
                    <div class="card-body ">
                        <h6 class="card-title">ID: ${employee.id}</h6>
                        <h6 class="card-title">Email: <a href = "mailto:${employee.email}">${employee.email}</a></h6 >
                        <h6 class="card-title">github:<a href ="https://github.com/${employee.github}"target="_blank">${employee.github} </a></h6>
                    </div >
                </div >
        `
        }
        else {
            results += `
                <div class="card col-2 p-0">
                    <h5 class="card-header heading">${employee.name}</h5>
                    <div class="card-body ">
                        <h6 class="card-title">ID: ${employee.id}</h6>
                        <h6 class="card-title">Email: <a href = "mailto:${employee.email}">${employee.email}</a></h6 >
                        <h6 class="card-title">School: ${employee.school}</h6>
                    </div >
                </div >
        `
        }
    })

    results += `</div>
    </div>

</body>

</html>
    `
    return results;
}
