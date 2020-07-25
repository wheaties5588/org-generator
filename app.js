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


// const createEmployees = async () => {
    
//         const { another, ...empInfo } = await inquirer.prompt(managerQuestions);
//         employees.push(empInfo);
        
//         if (another) {
//             createEmployees()
//         } else {
//             console.log(employees);
//             return employees;
//         }
// }

// createEmployees();

// const blah = () => {
//     inquirer
//   .prompt(managerQuestions)
//   .then((res) => {
//       employees.push(res);
//       console.log(employees);
//       console.log(res[0].another);
      
//       if (res[0].another) {
//           blah();
//       }
//   })
//   .catch(error => {
//     if(error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else when wrong
//     }
//   });
  
// }

// blah();


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
