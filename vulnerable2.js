// vulnerable2.js

const { exec } = require('child_process');

// Example of a code vulnerability: Command injection via exec()
function executeCommand(userInput) {
    // Vulnerable to command injection attacks
    exec(userInput, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
}

// Example usage
const userInput = "ls; echo 'Injected command executed!'";
executeCommand(userInput);

