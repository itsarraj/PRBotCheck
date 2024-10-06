// vulnerable3.js

// Example of a code vulnerability: XSS vulnerability due to improper escaping
function renderUserInput(userInput) {
    // Vulnerable to XSS if userInput contains malicious scripts
    document.getElementById('output').innerHTML = userInput;
}

// Example usage
const userInput = "<script>alert('XSS Attack!');</script>";
renderUserInput(userInput);

