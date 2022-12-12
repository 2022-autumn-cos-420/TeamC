import React, {useState, Component} from "react";
import './HomePage.css';
import FlashCard from './components/Flashcard.js'
import ParseCard from './components/Parsecard.js'


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cardType: "FlashCard",
            frontText: "",
            backText: "",
            cardHint: "",
            cardDecks: "",
            flipState: false,
            addCard: this.props.addCard,
            shakeButtonState: false,
            ParseCardDeck: "",
            ParseCardEndDelimiter: "End Delimiter",
            ParseCardStartDelimiter: "Start Delimiter",
            ParseCardSeparator: "Separator",
            ParseCardTextArea: "",
            showSettings: false  
        }
        this.toggleCardType = this.toggleCardType.bind(this);
    }
    /////Parameters for ParseCard/////
    ParseCardEndDelimiterHandler = (event) => {
        this.setState({ParseCardEndDelimiter: event.target.value});
    }
    ParseCardStartDelimiterHandler = (event) => {
        this.setState({ParseCardStartDelimiter: event.target.value});
    }
    ParseCardSeparatorHandler = (event) => {
        this.setState({ParseCardSeparator: event.target.value});
    }
    ParseCardTextAreaHandler = (event) => {
        this.setState({ParseCardTextArea: event.target.value});
    }
    ParseCardDecksHandler = (event) => {
        this.setState({ParseCardDeck: event.target.value});
    }
    ///////////////////////////////////

    
    frontTextHandler = (event) => {
        this.setState({frontText: event.target.value});
    }

    backTextHandler = (event) => {
        this.setState({backText: event.target.value});
    }

    cardDecksHandler = (event) => {
        this.setState({cardDecks: event.target.value});
    }

    cardHintHandler = (event) => {
        this.setState({cardHint: event.target.value});
    }

    flipCardToggler = (event) => {
        this.setState({flipState: !this.state.flipState});
    }

    addCardHandler = (event) => {
        //First we need to find out if the user put in all they should have.
        //They do not need a hint, but they need everything else, frontText, backText, and the Deck
        if (this.state.frontText === "" || this.state.backText === "" || this.state.cardDecks === "") {
            console.log("User did not input all that they needed to!");

            //So now we might want to do something about it
            //Lets shake a button:
            this.setState({
                shakeButtonState: true
            });
            //Now we want to reset the animation so it actually plays it again for us
            setTimeout(() => this.setState({
                    shakeButtonState: false
                }), 500);

            //THIS BREAKS EVERYTHING AND I DO NOT KNOW WHY THAT IS!
            //Okay, what if the problem is on another side of the card, lets automatically flip the card over for the user
            if (this.state.frontText === "") { //Check the front
                console.log("Front is blank!");
                if (this.state.flipState === true) { //We are on the back side
                    this.setState({
                        flipState: false
                    });
                }
            }
            else if (this.state.backText === "") { //Check the back
                console.log("Back is blank!");
                if (this.state.flipState === false) { //We are on the front side
                    this.setState({
                        flipState: true
                    });
                }
            }
            return;
        }

        //Now we have to call the page above, to app.js
        let newDecksArray = [this.state.cardDecks];
        this.props.addCard(this.state.frontText, this.state.backText, this.state.cardHint, newDecksArray)

        this.setState({frontText: "",
                        backText: "",
                        cardHint: "",
                        cardDecks: "",
                        flipState: false,
                        shakeButtonState: false}, () => {console.log("New HomePage state frontText: ", this.state.frontText, "BackText: ", this.state.backText)});
    }

    toggleCardType = () => {
        if (this.state.cardType ==="FlashCard") {
            this.setState({cardType: "ParseCard"});
        }
        else {
            this.setState({cardType: "FlashCard"});
        }
    }

    toggleSettings = () => {
        this.setState({showSettings: !this.state.showSettings});
        console.log(this.state.showSettings);
    }

    parseCardHandler = (event) => {
        console.log("Trying to parse cards!");
        
        console.log(this.state.ParseCardStartDelimiter,this.state.ParseCardEndDelimiter);
        console.log(this.state.ParseCardSeparator, this.state.ParseCardTextArea, this.state.ParseCardDeck);
        //Here we want to get the value of the text area, and parse the cards one by one using: this.props.addCard()
        //Might be a good idea to set the new value of the text area to the new cards to be parsed? We shall see what happens
        
        if ((this.state.ParseCardStartDelimiter === "Start Delimiter" || this.state.ParseCardEndDelimiter === "End Delimiter" || this.state.ParseCardSeparator === "Separator" ||
            this.state.ParseCardTextArea === "") || this.state.ParseCardDeck === "") {

            console.log("User did not input all that they needed to for parsing!");
            
            //So now we might want to do something about it
            //Lets shake a button:
            this.setState({
                shakeButtonState: true
            });
            //Now we want to reset the animation so it actually plays it again for us
            setTimeout(() => this.setState({
                    shakeButtonState: false
                }), 500);
            return;
        }
        //Begin parsing!
        let parsetext = this.state.ParseCardTextArea;
        console.log(parsetext);
        let startIndex = parsetext.indexOf(this.state.ParseCardStartDelimiter);
        let separator;
        let separatorIndex;
        let endIndex = parsetext.indexOf(this.state.ParseCardEndDelimiter);
    

        //Need to account for premature separator characters. 
        if (startIndex !== -1){
            separator = parsetext.substring(startIndex);
            separatorIndex = separator.indexOf(this.state.ParseCardSeparator)+startIndex;
        } else {separatorIndex = parsetext.indexOf(this.state.ParseCardSeparator);}
        //String that we need to add to flashcard
        let parsehit;
        //Amount of times a string in substring in parsing format has been discovered
        let instances = 0;
        //We'll need somewnere to put the parsecard deck
        let newDecksArrayp;
        // The line will be parsed if two requirements are met:
        // 1. All of the needed delimiters are present (not equal to -1 index)
         // 2. It's in the correct format: start char, separator, end char
        while ((startIndex !== -1 || endIndex !== -1 || separatorIndex !== -1)
                && (startIndex < separatorIndex && separatorIndex < endIndex)) { 
            parsehit = parsetext.substring(startIndex+1, endIndex);
            console.log(parsehit,"Shall be added to the flashcard deck in front:back format");
            console.log(startIndex,endIndex,separatorIndex);
            //split parsehit string between front and back
            let front = parsehit.substring(0,parsehit.indexOf(this.state.ParseCardSeparator));
            let back = parsehit.substring(parsehit.indexOf(this.state.ParseCardSeparator)+1);
            console.log("FRONT:",front,"BACK:",back);

            //On the first successful instance of parsing, we know we'll need a new deck. Don't want to create it more than once. 
            if(instances ===0){ newDecksArrayp = [this.state.ParseCardDeck];}
            //Now we'll add the card. 
            this.props.addCard(front, back, "", newDecksArrayp)

            //continue parsing for more occurances
            parsetext = parsetext.substring(endIndex+1);
            startIndex = parsetext.indexOf(this.state.ParseCardStartDelimiter);
            endIndex = parsetext.indexOf(this.state.ParseCardEndDelimiter);
            if (startIndex !== -1){
                separator = parsetext.substring(startIndex);
                separatorIndex = separator.indexOf(this.state.ParseCardSeparator)+startIndex;
            } else {separatorIndex = parsetext.indexOf(this.state.ParseCardSeparator);}
            
            instances++;
        }
        if (instances === 0) {
            console.log("Invalid text field for parsing");
            //So now we might want to do something about it
            //Lets shake a button:
            this.setState({
                shakeButtonState: true
            });
            //Now we want to reset the animation so it actually plays it again for us
            setTimeout(() => this.setState({
                    shakeButtonState: false
                }), 500);
            return false;
        } else{
            //Some parsing has been done successfully. Clear any input boxes
            this.setState({ParseCardTextArea: "",
           
            
                            ParseCardDeck: "",
            
                        /*  ParseCardEndDelimiter: "",
                            ParseCardStartDelimiter: "",
                            ParseCardSeparator: "",
                         */ //User probably wants to keep their delimiters!
                        shakeButtonState: false}, () => {console.log("New HomePage state Parsing text: ", this.state.ParseCardTextArea, "Parsing deck: ", this.state.ParseCardDeck)});
            return true;
        }   

    }


    render() {
        return (
            <div>
                {this.state.cardType === "FlashCard" && <FlashCard 
                                                            type={"Normal"} 
                                                            frontText={this.state.frontText} 
                                                            backText={this.state.backText} 
                                                            cardHint={this.state.cardHint} 
                                                            cardDecks={this.state.cardDecks} 
                                                            update={this.updateHandler} 
                                                            flipState={this.state.flipState} 
                                                            flipCard={this.flipCardToggler} 
                                                            frontTextHandler={this.frontTextHandler} 
                                                            backTextHandler={this.backTextHandler} 
                                                            cardDecksHandler={this.cardDecksHandler} 
                                                            cardHintHandler={this.cardHintHandler}></FlashCard>}
                {this.state.cardType === "ParseCard" && <ParseCard
                                                            type={"Normal"} 
                                                            ParseCardStartDelimiter={this.state.ParseCardStartDelimiter}
                                                            ParseCardEndDelimiter={this.state.ParseCardEndDelimiter}
                                                            ParseCardTextArea={this.state.ParseCardTextArea}
                                                            ParseCardSeparator={this.state.ParseCardSeparator}
                                                            ParseCardDeck = {this.state.ParseCardDeck}
                                                            ParseCardStartDelimiterHandler={this.ParseCardStartDelimiterHandler} 
                                                            ParseCardEndDelimiterHandler={this.ParseCardEndDelimiterHandler} 
                                                            ParseCardTextAreaHandler={this.ParseCardTextAreaHandler}
                                                            ParseCardSeparatorHandler={this.ParseCardSeparatorHandler}
                                                            ParseCardDecksHandler={this.ParseCardDecksHandler}></ParseCard>}
                <div className="HomeCardButtons">
                    <label className="Switch">
                        <input type="checkbox"></input>
                        <span className = "slider round" onClick={() => this.toggleCardType()}></span>
                    </label>
                    <button className="AddCardButton" data-testid="AddCardButton" style={{animation: this.state.shakeButtonState === false ? 'none' : 'horizontal-shaking .5s'}} onClick={this.state.cardType === "FlashCard" ? () => this.addCardHandler() : () => this.parseCardHandler()}>&#43;</button>
                </div>
                <div className="SettingsBox" style={{animation: this.state.showSettings === false ? 'rollOut 1s forwards': 'rollIn 1s forwards'}}>
                    <d className="SettingsHeader">Settings:</d>
                    <button className="EmailButton">Email Notifications</button>
                    <button className="TemplatesButton">Templates</button>
                </div>
                <button className = "SettingsButton" onClick={() => this.toggleSettings()}></button>
            </div>


        )
    }
}

export default HomePage;