const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let company = [];

let employeeQuestions = [
    {
        type: 'list',
        name: 'employeeType',
        message: 'What kinda of employee do you want to add?',
        choices: [
            'Engineer',
            'Intern',
            'Manager',
            'Exit'
        ],
        initial: 1
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
        .then((answers) => {
            // push the employee 
            if (answers.employeeType === 'Manager') {
                // create manager
                company.push(new Manager(answers.name, answers.id, answers.email, answers.officeNumber))
                // call function that writes to page?
                console.log(company);
                addEmployee();
            }
            else if (answers.employeeType === 'Engineer') {
                company.push(new Engineer(answers.name, answers.id, answers.email, answers.github))
                console.log(company);
                addEmployee();
            }
            else if (answers.employeeType === 'Intern') {
                // intern
                company.push(new Intern(answers.name, answers.id, answers.email, answers.school))
                console.log(company);
                addEmployee();
            }
            else {
                // send company to create html page
                let info = generateEmployeeCard(company);

                fs.writeFile('index.html', info, (err) =>
                    err ? console.log(err) : console.log('Successfully created GENERATED-README.me!'))
            }
        })
}

addEmployee();


function generateEmployeeCard(company) {


    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style.css">
    <title>Team Profile</title>
</head>

<body>

    <div class="jumbotron text-center">
        <h1 class="display-4">Team Info</h1>
    </div>

    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style.css">
    <title>Team Profile</title>
</head>

<body>

    <div class="jumbotron text-center">
        <h1 class="display-4">Team Info</h1>
    </div>

    <div class="row w-100">
        <div class="col-12 d-inline-flex  justify-content-center">
            ${card = function () {
            company.forEach(function (employee) {
                employeeCard(employee)
            })
        }}
        </div>
    </div>

</body>

</html>

</body>

</html>
    `

}

function employeeCard(employee) {
    // I hate doing this its so dry but time is ticking
    if (employee.getRole() === "Manager") {
        return `
            <div class="card col-2 p-0">
                <h5 class="card-header heading">${employee.name}</h5>
                <div class="card-body ">
                    <h6 class="card-title">ID: ${employee.id}</h6>
                    <h6 class="card-title">Email: < href = mailto:${employee.email}">${employee.email}</></h6 >
                    <h6 class="card-title">Office number:${employee.officeNumber}</h6>
                </div >
            </div >
    `
    }
    else if (employee.getRole() === "Engineer") {
        return `
             <div class="card col-2 p-0">
                <h5 class="card-header heading">${employee.name}</h5>
                <div class="card-body ">
                    <h6 class="card-title">ID: ${employee.id}</h6>
                    <h6 class="card-title">Email: < href = mailto:${employee.email}">${employee.email}</></h6 >
                    <h6 class="card-title">github:<a href ="https://github.com/ /${employee.github}"target="_blank"></h6>
                </div >
            </div >
    `
    }
    else {
        return `
            <div class="card col-2 p-0">
                <h5 class="card-header heading">${employee.name}</h5>
                <div class="card-body ">
                    <h6 class="card-title">ID: ${employee.id}</h6>
                    <h6 class="card-title">Email: < href = mailto:${employee.email}">${employee.email}</></h6 >
                    <h6 class="card-title">School: ${employee.school}</h6>
                </div >
            </div >
    `
    }
}
