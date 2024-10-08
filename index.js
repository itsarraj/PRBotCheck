const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');

// Vulnerability 1: Command Injection
function runCommand(userInput) {
    exec(`ls ${userInput}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Command execution error: ${error}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
}

// Vulnerability 2: Insecure use of eval()
function runEval(userInput) {
    eval(userInput);  // Dangerous use of eval leading to code execution
}

// Vulnerability 3: Insecure randomness
function generateWeakToken() {
    return Math.random().toString(36).substring(2);  // Weak token generation
}

// Vulnerability 4: Hardcoded sensitive information
const apiKey = '12345-SECRET-API-KEY';  // Hardcoded sensitive information

// Vulnerability 5: Hardcoded MongoDB connection string
const mongoUrl = 'mongodb://admin:password@localhost:27017/mydatabase';  // Hardcoded MongoDB connection

// Vulnerability 6: Storing SSH Private Key insecurely
const sshPrivateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA7kjbBBkLmOWK1X8...
-----END RSA PRIVATE KEY-----
`;  // Hardcoded SSH key

// Vulnerability 7: SQL Injection
function getUserData(userInput) {
    const sqlQuery = `SELECT * FROM users WHERE name = '${userInput}'`;  // SQL injection vulnerability
    console.log(sqlQuery);
}

// Vulnerability 8: Insecure file permissions
function insecureFileAccess() {
    fs.chmodSync('important_config_file', 0o777);  // Granting excessive permissions to a file
}

console.log("This app uses outdated libraries such as chalk 1.1.3, minimist 0.0.8, etc.");

module.exports = { runCommand, runEval, generateWeakToken, getUserData, insecureFileAccess };

