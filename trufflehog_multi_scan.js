const { exec } = require('child_process');

// Function to run TruffleHog scan on a Git repository with specified regex pattern
function runTruffleHogScan(repoUrl, secretRegex) {
    return new Promise((resolve, reject) => {
        const command = `trufflehog --regex --rules ${secretRegex} ${repoUrl}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing TruffleHog for ${repoUrl}: ${error.message}`);
                reject(error);
            }
            if (stderr) {
                console.error(`TruffleHog stderr for ${repoUrl}: ${stderr}`);
            }

            // Log the TruffleHog scan output
            console.log(`TruffleHog output for ${repoUrl}: ${stdout}`);

            resolve(stdout);
        });
    });
}

// List of repositories to scan
const repositories = [
    'https://github.com/example/repo1.git',
    'https://github.com/example/repo2.git',
    'https://github.com/example/repo3.git'
];

// Secret patterns or rules to match
const secretPatterns = {
    'AWS Access Key': '"AKIA[0-9A-Z]{16}"',
    'GitHub Token': '[a-f0-9]{40}',
    'Slack Token': 'xox[baprs]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]{24}',
    'Private Key': '-----BEGIN (EC|DSA|RSA|OPENSSH) PRIVATE KEY-----'
};

// Function to scan multiple repositories with different secrets
async function scanMultipleRepos() {
    for (const repo of repositories) {
        console.log(`Scanning repository: ${repo}`);

        for (const [secretName, secretRegex] of Object.entries(secretPatterns)) {
            console.log(`Scanning for: ${secretName}`);
            try {
                await runTruffleHogScan(repo, secretRegex);
            } catch (error) {
                console.error(`Failed to scan ${repo} for ${secretName}`);
            }
        }
    }
}

// Start the scan process
scanMultipleRepos()
    .then(() => {
        console.log('Completed scanning all repositories.');
    })
    .catch((err) => {
        console.error('Error during multi-repo scan:', err);
    });
