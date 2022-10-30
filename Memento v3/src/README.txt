README 10/27/2022
By Page:
-Home       - Added more checking to see if the user has inputted all fields, and if not they will not be able to 
                add a card to the deck
            - User can actually edit the deck name!
            - Animation added to addCard button - shakes when we cannot add a card

-Library    - Deck cards now have hover animation
            - Deck cards have the number of cards in the deck working
            - Deck cards have the name of the deck working for all four on the page
            - Decks can now be selected by clicking on their deck name

-Quiz       - New Page!
            - Using the same homepage flashcard code for the most part
            - Button added for whether the user is right or wrong

To Add in the near future:
-Home       - Ability to edit cards that we have - buttons to go the next card and previous card
            - Need animations to show card transition - fadeing in/out or even better card flying in from the left 
                or the right depending on the direction of where it is coming from/going to in the deck
            - Need option to delete card that we are on

-Library    - Add highlight to the current deck
            - Add pages to the decks, we need to be able to support more than four decks
            - Add option to rename decks?
            - Add option to delete decks?

-Quiz       - Need fly and and fly out animations or fade in/fade out


Currently in order to run this web page there are two options, both work perfectly fine:

Simple Method
-Download folder "Memento v3"
-Run home.html in any browser on local machine
-Done!

OR

Using python http.server
-Ensure that python3 is installed on local machine
-Download folder "Memento v3"
-Open downloaded folder in terminal and run the command "python3 -m http.server"
-In browser open http://0.0.0.0:8000/ and select home.html
-Done!

