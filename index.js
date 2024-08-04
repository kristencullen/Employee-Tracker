const inquirer = require("inquirer");
const pool = require("./db/connection");

const mainMenu = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployeeRole();
          break;
        default:
          pool.end();
          process.exit();
      }
    });
};

const viewDepartments = async () => {
  const res = await pool.query("SELECT * FROM department");
  console.table(res.rows);
  mainMenu();
};

const viewRoles = async () => {
  const res = await pool.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id"
  );
  console.table(res.rows);
  mainMenu();
};

const viewEmployees = async () => {
  const res = await pool.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id"
  );
  console.table(res.rows);
  mainMenu();
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the department:",
    })
    .then(async (answer) => {
      await pool.query("INSERT INTO department (name) VALUES ($1)", [
        answer.name,
      ]);
      console.log("Department added successfully!");
      mainMenu();
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the name of the role:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary of the role:",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID of the role:",
      },
    ])
    .then(async (answer) => {
      await pool.query(
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
        [answer.title, answer.salary, answer.department_id]
      );
      console.log("Role added successfully!");
      mainMenu();
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the role ID of the employee:",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Enter the manager ID of the employee (leave blank if none):",
      },
    ])
    .then(async (answer) => {
      await pool.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
        [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id || null,
        ]
      );
      console.log("Employee added successfully!");
      mainMenu();
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "Enter the ID of the employee you want to update:",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter the new role ID of the employee:",
      },
    ])
    .then(async (answer) => {
      await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [
        answer.role_id,
        answer.employee_id,
      ]);
      console.log("Employee role updated successfully!");
      mainMenu();
    });
};

mainMenu();
