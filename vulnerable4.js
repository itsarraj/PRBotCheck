// vulnerable4.js

// This code uses eval(), which is unsafe as it allows arbitrary code execution.
function insecureFunction(userInput) {
    eval(userInput); // Potentially dangerous usage of eval()
}

// Example usage
const userInput = "alert('Hello, world!')";
insecureFunction(userInput);

