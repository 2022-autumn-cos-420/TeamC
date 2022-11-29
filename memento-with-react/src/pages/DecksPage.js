import React, {Component} from "react";
import './DecksPage.css';
import DeckCard from "./components/Deckcard.js"
import styled from 'styled-components';


class DeckPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decksList: this.props.decksList,
            deckOne: this.props.decksList.length > 0 ? this.props.decksList[0].slice(): "Deck Name",
            deckTwo: this.props.decksList.length > 1 ? this.props.decksList[1].slice(): "Deck Name",
            deckThree: this.props.decksList.length > 2 ? this.props.decksList[2].slice(): "Deck Name",
            deckFour: this.props.decksList.length > 3 ? this.props.decksList[3].slice(): "Deck Name",
            page: 0,
            numDecks: this.props.decksList.length
        };
        this.nextPageHandler = this.nextPageHandler.bind(this);
    }


    nextPageHandler = (what) => {
        console.log("Time to go forward from page: ", this.state.page);
        if (((this.state.page * 4) + 5) < this.props.decksList.length) {
            //We can go to the next page
            console.log("Trying to go forward to the next page!");
            let newDeckOne = this.props.decksList.length > ((this.state.page + 1) * 4 + 0) ? this.props.decksList[(this.state.page + 1) * 4 + 0]: "Deck Name";
            let newDeckTwo = this.props.decksList.length > ((this.state.page + 1) * 4 + 1) ? this.props.decksList[(this.state.page + 1) * 4 + 1]: "Deck Name";
            let newDeckThree = this.props.decksList.length > ((this.state.page + 1) * 4 + 2) ? this.props.decksList[(this.state.page + 1) * 4 + 2]: "Deck Name";
            let newDeckFour = this.props.decksList.length > ((this.state.page + 1) * 4 + 3) ? this.props.decksList[(this.state.page + 1) * 4 + 3]: "Deck Name";
            let newPage = this.state.page + 1;
            console.log("newPage should be: ", newPage);
            //I HAVE NO IDEA WHY THIS DOES NOT WORK
            this.setState({
                deckOne: newDeckOne,
                deckTwo: newDeckTwo,
                deckThree: newDeckThree,
                deckFour: newDeckFour,
                page: newPage,
            });
        }
        else {
            console.log("We cannot go any further");
        }
    }

    
    prevPageHandler = () => {
        console.log("Time to go back from page: ", this.state.page);
        if (this.state.page > 0) {
            console.log("Trying go backwards to the next page!");
            let newDeckOne = this.props.decksList.length > ((this.state.page - 1) * 4 + 0) ? this.props.decksList[(this.state.page - 1) * 4 + 0]: "Deck Name";
            let newDeckTwo = this.props.decksList.length > ((this.state.page - 1) * 4 + 1) ? this.props.decksList[(this.state.page - 1) * 4 + 1]: "Deck Name";
            let newDeckThree = this.props.decksList.length > ((this.state.page - 1) * 4 + 2) ? this.props.decksList[(this.state.page - 1) * 4 + 2]: "Deck Name";
            let newDeckFour = this.props.decksList.length > ((this.state.page - 1) * 4 + 3) ? this.props.decksList[(this.state.page - 1) * 4 + 3]: "Deck Name";
            let newPage = this.state.page - 1;
            this.setState({
                deckOne: newDeckOne,
                deckTwo: newDeckTwo,
                deckThree: newDeckThree,
                deckFour: newDeckFour,
                page: newPage,
            });

        }
        else {
            console.log("We cannot go any further!");
        }
    }

    downloadHandler = (event) => {
        console.log("Event: ", event, "onPage: ", this.state.page);
    }

    studyHandler = (name) => {
        console.log("Trying to study from deckpage at index: ", name, "onPage: ", this.state.page);
        console.log("currentState:", this.state);
    }


    render() {
        return (
            <div className= "DecksContainer">

                <div className="title">
                    <p>Decks</p>
                    <div className="PageButtons">
                            <button className="PageLeft" data-testid="PrevPageButton" onClick={() => this.prevPageHandler("prev")}>
                                <LeftArrow src={`https://file.rendit.io/n/diSt5xpFMowspip8kpb8.svg`}></LeftArrow>
                            </button>
                            <button className="PageRight" data-testid="NextPageButton" onClick={() => this.nextPageHandler("next")}>
                                <RightArrow src={`https://file.rendit.io/n/YpUpJC5E4gqrKbyJxvYn.svg`}></RightArrow>
                            </button>
                    </div>
                </div>
                <div className = "DecksWindow">
                    <row className = "DecksRow">
                        <DeckCard deckName={this.state.deckOne} download={this.downloadHandler} study={this.studyHandler}></DeckCard>
                        <DeckCard deckName={this.state.deckTwo} download={this.downloadHandler} study={this.studyHandler}></DeckCard>
                    </row>
                    <row className = "DecksRow">
                        <DeckCard deckName={this.state.deckThree} download={this.downloadHandler} study={this.studyHandler}></DeckCard>
                        <DeckCard deckName={this.state.deckFour} download={this.downloadHandler} study={this.studyHandler}></DeckCard>
                    </row>
                </div>
            </div>
        )
    }

}


const LeftArrow = styled.img`
  width: 15px;
  height: 20px;
`;

const RightArrow = styled.img`
  width: 15px;
  height: 20px;
`;

export default DeckPage;