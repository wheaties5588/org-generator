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


//Questions for the manager role
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

//Questions for the engineer role
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

//Questions for the intern role
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

//Empty array that new employees created in the app will be pushed to then used to render the HTML
var employees = [];

//New Manager function with prompt, then calling newEmp function
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
    
    //Control if another employee is going to be created, will call those functions appropriately, if another rolse isn't chosen, the HTML file will be written and user will exit the app
    if (res.empType === "Engineer") {
      newEngineer();
    } else if (res.empType === "Intern") {
      newIntern();
    } else {
      // If directory doesn't exist, it is created here
      if (!fs.existsSync(OUTPUT_DIR)) {
        console.log("Creating output directory..");
        fs.mkdirSync(OUTPUT_DIR);
      }
      
      //Write the file using the output path and the render function with the employees array passed
      fs.writeFile(outputPath, render(employees), "utf8", function() {
        console.log("File successfully created!");
      })
    }
  }).catch(error => {
    console.log("Could not create file.");
    console.log(error);
  });  
}

//Function for new engineer role
newEngineer = () => {
  inquirer.prompt(engineerQuestions).then(res => {
    employees.push(new Engineer(res.engName, res.engID, res.engEmail, res.engGithub));
    newEmp();
  })
}

//Function for new intern role
newIntern = () => {
  inquirer.prompt(internQuestions).then(res => {
    employees.push(new Intern(res.internName, res.internID, res.internEmail, res.internSchool));
    newEmp();
  })
}


//Call manager function to start asking questions
newManager();