
//Test implementation of terms/definitions parsing for memento.
//Check out the readme for specifics.
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.io.FileWriter;

public class ParseNotes {

    public static void main(String args[]) {
        FileInputStream stream = null;

        try {
            stream = new FileInputStream("TestNotes.txt");

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
        String strLine;
        ArrayList<String> lines = new ArrayList<String>();
        try {
            // Create output files
            FileWriter t = new FileWriter("Terms.txt");
            FileWriter d = new FileWriter("Definitions.txt");
            while ((strLine = reader.readLine()) != null) {
                // Loop through current line. Does this line have a ":" character?
                for (int i = 0; i < strLine.length(); i++) {
                    if (strLine.charAt(i) == ':') {
                        // Split term and definition, writing each to separate files.
                        t.write(strLine.substring(0, i) + '\n');
                        d.write(strLine.substring(i + 2) + '\n');
                    }
                }
            }
            d.close();
            t.close();
        } catch (IOException e1) {
            e1.printStackTrace();
        }

        // Debug (ignore)

        try {
            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(lines);
    }

}