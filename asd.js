const { exec } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const minimist = require('minimist');
const lodash = require('lodash');
const chalk = require('chalk');

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

// Vulnerability 9: Prototype Pollution via lodash
function exploitLodash() {
    const payload = '{"__proto__": {"isAdmin": true}}';
    const obj = {};
    lodash.merge(obj, JSON.parse(payload));
    console.log("Prototype Pollution: ", obj.isAdmin);  // Outputs: true
}

// Vulnerability 10: ReDoS via minimist
function minimistReDoS() {
    const userInput = '--foo='.repeat(10000);  // Large input to cause Regular Expression Denial of Service
    const argv = minimist([userInput]);
    console.log(argv);
}

// Vulnerability 11: Improper String Handling via chalk
function chalkVuln() {
    const userInput = chalk.red("This is malicious ".repeat(10000));  // Potentially causing performance issues
    console.log(userInput);
}

// Example usage
const args = minimist(process.argv.slice(2));
if (args.runCommand) {
    runCommand(args.runCommand);
}
if (args.runEval) {
    runEval(args.runEval);
}
if (args.lodashExploit) {
    exploitLodash();
}
if (args.minimistReDoS) {
    minimistReDoS();
}
if (args.chalkVuln) {
    chalkVuln();
}

module.exports = { runCommand, runEval, generateWeakToken, getUserData, insecureFileAccess, exploitLodash, minimistReDoS, chalkVuln };
