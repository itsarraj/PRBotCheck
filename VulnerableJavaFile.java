import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.nio.file.Files;
import java.nio.file.Paths;

public class VulnerableJavaFile {

    // Vulnerability 1: Hardcoded sensitive information
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String USER = "root";
    private static final String PASS = "password";

    // Vulnerability 2: Hardcoded MongoDB connection string
    private static final String MONGO_URL = "mongodb://admin:password@localhost:27017/secureDB";

    // Vulnerability 3: Hardcoded SSH private key
    private static final String SSH_PRIVATE_KEY = 
        "-----BEGIN RSA PRIVATE KEY-----\n" +
        "MIIEpAIBAAKCAQEA7kjbBBkLmOWK1X8...\n" +
        "-----END RSA PRIVATE KEY-----";

    public static void main(String[] args) {
        String userInput = args[0]; // Simulated user input

        // Vulnerability 4: SQL Injection
        try {
            Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
            Statement stmt = conn.createStatement();
            String sql = "SELECT * FROM users WHERE username = '" + userInput + "'";
            stmt.executeQuery(sql);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Vulnerability 5: Insecure file access
        try {
            Files.setPosixFilePermissions(Paths.get("config.txt"), PosixFilePermissions.fromString("rwxrwxrwx")); // Overly permissive
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

