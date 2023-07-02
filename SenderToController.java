import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GoogleSheetsExample {

    private static final String APPLICATION_NAME = "Google Sheets Example";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
    private static final String SPREADSHEET_ID = "your-spreadsheet-id";

    public static void main(String[] args) {
        try {
            // Build a service object for interacting with the Sheets API
            Sheets sheetsService = buildSheetsService();

            // Example: SELECT statement
            String selectQuery = "SELECT Name, Age FROM Sheet1";
            List<List<Object>> selectResult = executeQuery(sheetsService, selectQuery);
            printResult(selectResult);

            // Example: UPDATE statement
            String updateQuery = "UPDATE Sheet1 SET Age = '30' WHERE Name = 'John'";
            int updateCount = executeUpdate(sheetsService, updateQuery);
            System.out.println("Rows updated: " + updateCount);

            // Example: DELETE statement
            String deleteQuery = "DELETE FROM Sheet1 WHERE Age = '25'";
            int deleteCount = executeUpdate(sheetsService, deleteQuery);
            System.out.println("Rows deleted: " + deleteCount);

            // Example: INSERT INTO statement
            String insertQuery = "INSERT INTO Sheet1 (Name, Age) VALUES ('Emily', '35')";
            int insertCount = executeUpdate(sheetsService, insertQuery);
            System.out.println("Rows inserted: " + insertCount);

            // Example: CREATE TABLE statement
            String createTableQuery = "CREATE TABLE Sheet2 (ID, Name, Age)";
            executeUpdate(sheetsService, createTableQuery);
            System.out.println("Table created.");

            // Example: DROP TABLE statement
            String dropTableQuery = "DROP TABLE Sheet2";
            executeUpdate(sheetsService, dropTableQuery);
            System.out.println("Table dropped.");

        } catch (IOException | GeneralSecurityException e) {
            e.printStackTrace();
        }
    }


