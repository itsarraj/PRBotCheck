// vulnerable-command-injection.js
const { exec } = require('child_process');

function runCommand(userInput) {
    // Potentially dangerous usage of user-controlled input
    exec(`ls ${userInput}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}

// Example usage
const userInput = '; rm -rf /'; // Malicious input that could delete files
runCommand(userInput);

// testsssssss
