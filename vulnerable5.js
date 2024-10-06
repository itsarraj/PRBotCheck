// vulnerable4.js

// Example of hard-coded sensitive information
const sensitiveData = 'secret_api_key_12345';

// Example of SQL injection vulnerability
const userInput = req.query.input;
const sqlQuery = `SELECT * FROM users WHERE name = '${userInput}'`;

// Example of XSS vulnerability
const userInput = req.body.userInput;
res.send(`<div>${userInput}</div>`); // XSS vulnerability

// Example of command injection vulnerability
const exec = require('child_process').exec;
exec(`ls ${userInput}`, (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});


