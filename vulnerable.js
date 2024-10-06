// vulnerable.js

// Example of a code vulnerability: Use of eval()
function executeCode(userInput) {
    // Vulnerable to code injection attacks
    eval(userInput);
}

// Example usage
const userInput = "console.log('Injected code executed!')";
executeCode(userInput);

