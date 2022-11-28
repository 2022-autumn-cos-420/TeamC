import React, {useState, Component} from "react";
import './HomePage.css';
import FlashCard from './components/Flashcard'
import ParseCard from './components/Parsecard'

// class App extends React.Component<{ message: string }, { count: number }> {
//     state = { count: 0 };
//     render() {
//       return (
//         <div onClick={() => this.increment(1)}>
//           {this.props.message} {this.state.count}
//         </div>
//       );
//     }
//     increment = (amt: number) => {
//       // like this
//       this.setState((state) => ({
//         count: state.count + amt,
//       }));
//     };
//   }

interface Props {
    cardType: string;
    addCard: (cFrontText: string, cBackText: string, cCardHint: string, cCardDeck: string) => void;
};
interface State {
    cardType: string,
    frontText: string,
    backText: string,
    cardHint: string,
    cardDeck: string,
    addCard: (cFrontText: string, cBackText: string, cCardHint: string, cCardDeck: string) => void
};

class HomePage extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            cardType: "FlashCard",
            frontText: "",
            backText: "",
            cardHint: "",
            cardDeck: "",
            addCard: this.props.addCard
        }
        this.toggleCardType = this.toggleCardType.bind(this);
    }
    

    updateHandler = (newFront: string, newBack: string, newHint: string, newDeck: string): void => {
        console.log("updating!");
        this.setState({frontText: newFront,
                        backText: newBack,
                        cardHint: newHint,
                        cardDeck: newDeck});
    }

    addCardHandler = (event: MouseEvent): void => {
        this.setState({frontText: "",
                        backText: "",
                        cardHint: "",
                        cardDeck: ""}, () => {console.log("New HomePage state frontText: ", this.state.frontText)});
                    
        //Now we have to call the page above, to app.js
        console.log("Trying to add Card! in HomePage, got: ", this.state.frontText, "Back: ", this.state.backText);
        //! Changed newDeckArray to be a string, assuming that the user only adds new cards to at most 1 deck
        let newDeckArray = this.state.cardDeck;
        this.props.addCard(this.state.frontText, this.state.backText, this.state.cardHint, newDeckArray)
    }

    toggleCardType = () => {
        if (this.state.cardType ==="FlashCard") {
            this.setState({cardType: "ParseCard"});
        }
        else {
            this.setState({cardType: "FlashCard"});
        }
        console.log("Toggling Card!");
    }

    render() {
        return (
            <div>
                {this.state.cardType === "FlashCard" && <FlashCard type={"Normal"} frontText={this.state.frontText} backText={this.state.backText} cardHint={this.state.cardHint} cardDeck={this.state.cardDeck} update = {this.updateHandler}></FlashCard>}
                {this.state.cardType === "ParseCard" && <ParseCard cardDeck={this.state.cardDeck}></ParseCard>}
                <div className="HomeCardButtons">
                    <label className="Switch">
                        <input type="checkbox"></input>
                        <span className = "slider round" onClick={() => this.toggleCardType}></span>
                    </label>
                    <button className="AddCardButton" onClick={() => this.addCardHandler}>&#43;</button>
                </div>
            </div>


        )
    }
}

export default HomePage;