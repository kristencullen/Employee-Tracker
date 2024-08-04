# Employee Tracker

## Description

Employee Tracker is a command-line application built with Node.js, Inquirer, and PostgreSQL that allows business owners to manage their company's employee database. The application provides options to view and manage departments, roles, and employees, making it easy to organize and plan business operations.

## Table of Contents

Installation
Usage
Features
Technologies Used
License
Contributing
Questions 

## Installation
To install the necessary dependencies, run the following command:
npm install

Ensure that you have PostgreSQL installed and running on your machine. You need to create a database named employee_tracker and set up the necessary tables.

Create the database:
psql -U your_db_user -c "CREATE DATABASE employee_tracker;"

Set up the tables:

psql -U (username) -d employee_tracker -f schema.sql
Replace (username) with your PostgreSQL username. The schema.sql file should contain the necessary SQL commands to create the department, role, and employee tables.

## Usage

To Start the application, run the command node index.js.

Follow the prompts to view and manage the departments, roles, and employees in the company.

## Features

View all departments
View all roles
View all employees
Add a department
Add a role
Add an employee
Update an employee role

## Technologies Used

Node.js
Inquirer
PostgreSQL
pg (node-postgres)

## Walkthrough Video

https://drive.google.com/file/d/1UcgEnEmQOGArmVggBZnOpza6QEYpIolc/view 
