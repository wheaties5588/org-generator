const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const managerQuestions = [
    {
        type: "input",
        message: "What is the name of the manager? ",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is the ID number of the manager? ",
        name: "managerID"
    },
    {
      type: "input",
      message: "What is the email address of the manager? ",
      name: "managerEmail"
    },
    {
      type: "input",
      message: "What is the office number of the manager? ",
      name: "managerOffice"
    }
]


const engineerQuestions = [
  {
      type: "input",
      message: "What is the name of the engineer? ",
      name: "engName"
  },
  {
      type: "input",
      message: "What is the ID number of the engineer? ",
      name: "engID"
  },
  {
    type: "input",
    message: "What is the email address of the engineer? ",
    name: "engEmail"
  },
  {
    type: "input",
    message: "What is the github username of the engineer? ",
    name: "engGithub"
  }
]


const internQuestions = [
  {
      type: "input",
      message: "What is the name of the intern? ",
      name: "internName"
  },
  {
      type: "input",
      message: "What is the ID number of the intern? ",
      name: "internID"
  },
  {
    type: "input",
    message: "What is the email address of the intern? ",
    name: "internEmail"
  },
  {
    type: "input",
    message: "What school does the intern currently attend? ",
    name: "internSchool"
  }
]


var employees = [];

//New Manager
newManager = () => {
  
  inquirer.prompt(managerQuestions).then(res => {
    
    employees.push(new Manager(res.managerName, res.managerID, res.managerEmail, res.managerOffice));
    newEmp();
    
  });
}

//New engineer or intern
newEmp = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "What type of employee would you like to create? ",
      name: "empType",
      choices: [
        "Engineer",
        "Intern",
        "Done creating employees"
      ]
    }
  ]).then(res => {
    if (res.empType === "Engineer") {
      newEngineer();
    } else if (res.empType === "Intern") {
      newIntern();
    } else {
      // Write to file
      if (!fs.existsSync(OUTPUT_DIR)) {
        console.log("Creating output directory..");
        fs.mkdirSync(OUTPUT_DIR);
      }
      fs.writeFile(outputPath, render(employees), "utf8", function() {
        console.log("File successfully created!");
      })
    }
  }).catch(error => {
    console.log("Could not create file.");
    console.log(error);
  });  
}

newEngineer = () => {
  inquirer.prompt(engineerQuestions).then(res => {
    employees.push(new Engineer(res.engName, res.engID, res.engEmail, res.engGithub));
    newEmp();
  })
}


newIntern = () => {
  inquirer.prompt(internQuestions).then(res => {
    employees.push(new Intern(res.internName, res.internID, res.internEmail, res.internSchool));
    newEmp();
  })
}


//Call manager function to start asking questions
newManager();
