
//Test implementation of terms/definitions parsing for memento.
//Check out the readme for specifics.
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.io.FileWriter;
import java.util.*;

public class ParseNotes {

    public static void main(String args[]) {
        FileInputStream stream = null;
        // s shall be the separator character for a term and definition
        Scanner s = new Scanner(System.in);
        System.out.println("What character separates a term from a definition in your notes?");
        System.out.println("(ex. TERM: DEFINITION where ':' is the character)");

        // startin:beginning character , endin:finishing character
        Scanner startin = new Scanner(System.in);
        Scanner endin = new Scanner(System.in);

        String aa = s.nextLine();
        System.out.println("Input the starting delimiter");
        String start = startin.nextLine();
        System.out.println("Input the ending delimiter");

        String end = endin.nextLine();
        s.close();
        startin.close();
        endin.close();

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
                int startIndex = strLine.indexOf(start);
                int separatorIndex = strLine.indexOf(aa);
                int endIndex = strLine.indexOf(end);
                // The line will be parsed if two requirements are met:
                // 1. All of the needed delimiters are present (not equal to -1 index)
                // 2. It's in the correct format: start char, separator, end char
                if ((startIndex != -1 || endIndex != -1 || separatorIndex != -1)
                        && (startIndex < separatorIndex && separatorIndex < endIndex)) {

                    // Split term and definition, writing each to separate files.
                    t.write(strLine.substring(startIndex + 1, separatorIndex) + '\n');
                    d.write(strLine.substring(separatorIndex + 1, endIndex) + '\n');

                }
            }
            d.close();
            t.close();
            // Debug (ignore)

        } catch (IOException e1) {
            e1.printStackTrace();
        }
        try {
            reader.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(lines);
    }

}