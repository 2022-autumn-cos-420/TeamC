A java implementation of a text parser for our app. Super basic atm since I'm not sure how things will work with the app quite yet. 

To test it splitting the terms/definitions, I included some random notes that I had on google drive which I converted to .txt

How it works:

-Run ParseNotes.java

-It assumes there's it has a notes file in the same folder to work with. I named it TestNotes.txt

-It will go through line by line until it finds a ':' character which is the separator

-Since it's pretty basic at the moment it assumes 'TERM: DEFINITION' will be on the same line and in that exact format.

-The terms and definitions will be written to their respective output files Terms.txt and Definitions.txt

- .txt files seem to work the best but you can modify it to try other formats.