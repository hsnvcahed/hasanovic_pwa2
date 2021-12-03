const fs = require('fs');
const path = require('path');

const f = path.resolve(__dirname, 'employees.json');

const data = fs.readFileSync(f);
const { employees } = JSON.parse(data);

const getEmployees = () => employees;

module.exports = { getEmployees };
