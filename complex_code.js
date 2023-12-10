/*   complex_code.js

This code demonstrates a complex and sophisticated system for managing employee data.

*/

// Define the Employee class
class Employee {
  constructor(name, age, position, salary) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.salary = salary;
  }

  displayInformation() {
    console.log(`Name: ${this.name}`);
    console.log(`Age: ${this.age}`);
    console.log(`Position: ${this.position}`);
    console.log(`Salary: ${this.salary}`);
  }

  raiseSalary(amount) {
    this.salary += amount;
    console.log(`Salary raised by ${amount}`);
  }
}

// Define the Company class
class Company {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.employees = [];
  }

  hireEmployee(employee) {
    this.employees.push(employee);
    console.log(`${employee.name} hired successfully.`);
  }

  fireEmployee(employee) {
    const index = this.employees.findIndex(emp => emp === employee);
    if (index !== -1) {
      this.employees.splice(index, 1);
      console.log(`${employee.name} fired successfully.`);
    } else {
      console.log(`${employee.name} not found in the company.`);
    }
  }

  displayAllEmployees() {
    console.log(`Company: ${this.name}`);
    console.log(`Location: ${this.location}`);
    console.log("Employees:");
    for (const employee of this.employees) {
      employee.displayInformation();
      console.log("------------------------");
    }
  }
}

// Create a new company
const company = new Company("ABC Corporation", "New York");

// Create some employee instances
const john = new Employee("John Smith", 30, "Manager", 5000);
const sarah = new Employee("Sarah Johnson", 25, "Developer", 4000);
const jake = new Employee("Jake Davis", 35, "Sales Executive", 3500);

// Add employees to the company
company.hireEmployee(john);
company.hireEmployee(sarah);
company.hireEmployee(jake);

// Display all employees in the company
company.displayAllEmployees();

// Perform some actions on employees
john.raiseSalary(1000);
sarah.raiseSalary(500);

// Display updated employee information
company.displayAllEmployees();