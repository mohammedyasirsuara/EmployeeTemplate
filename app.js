const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const forManager =[
    {
        name: "name",
        message: "What is the name of the Manager?"
    },
    {
        name: "id",
        message: "Enter manager id:"
    },
    {
        name: "email",
        message: "Enter manager email:"
    },
    {
        name: "officeNumber",
        message: "What is the Manager's office number?"
    }
];

const employ = [
    {
        type:"list",
        name:"employee",
        message: "What employee would you like to add?",
        choices: ["Engineer", "Intern", "No"],
    }
];

const forIntern =[
    {
        name: "name",
        message: "What is the Intern's name?"
    },
    {
        name: "id",
        message: "Enter employee id of intern:"
    },
    {
        name: "email",
        message: "Enter his/her email:"
    },
    {
        name: "school",
        message: "What school does the intern attend?"
    }
];

const forEngineer=[
    {
        name: "name",
        message: "What is the name of the Engineer?"
    },
    {
        name: "id",
        message: "Enter engineer's employee id:"
    },
    {
        name: "email",
        message: "Enter email:"
    },
    {
        name: "github",
        message: "Enter engineer's github username:"
    }
];
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


let employees=[];

(async () =>{ 
    let manager = await inquirer.prompt(forManager);
    let newManager = new Manager(
        manager.name, 
        manager.id, 
        manager.email, 
        manager.officeNumber);
    employees.push(newManager);
    addEmployee();
})();

let addEmployee = async()=>{
    let inq = await inquirer.prompt(employ);
    if(inq.employee=="Engineer"){
        let eng = await inquirer.prompt(forEngineer);
        let newEng = new Engineer(
            eng.name, 
            eng.id,
            eng.email, 
            eng.github)
        employees.push(newEng);
        addEmployee();
    }else if(inq.employee=="Intern"){
        let intern = await inquirer.prompt(forIntern);
        let newIntern = new Intern(
            intern.name, 
            intern.id, 
            intern.email, 
            intern.school);
        employees.push(newIntern);
        addEmployee();
    }else{
        fs.writeFileSync(outputPath, render(employees))
    }
}