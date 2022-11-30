import React, {Component} from 'react';
import './Parsecard.css';


class ParseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localCardDecks: this.props.cardDecks
        }
    }





    handleStartDelimiterChange = (event) => {
        console.log("Changing the start delimiter!");

    }

    handleSeparatorChange = (event) => {
        console.log("Changing the separator!");
    }

    handleEndDelimiterChange = (event) => {
        console.log("Changing the end delimiter!");
    }

    handleDeckChange = (event) => {
        console.log("Changing the deck!");
    }

    handleParseCardTextAreaChange = (event) => {
        console.log("Changing the ParseCardTextArea")
    }

    render() {
        return (
            <div className="ParseCard">
                <div className="ParseCardInner">
                    <top>
                        <ul>
                            <li><span className="Dot"></span></li>
                            <li><input type="CardHint" data-testid="ParseCardStartDelimiter" onChange={this.handleStartDelimiterChange} placeholder="Start Delimiter"></input></li>
                            <li><input type="CardHint" data-testid="ParseCardSeparator" onChange={this.handleSeparatorChange} placeholder="Separator"></input></li>
                            <li><input type="CardHint" data-testid="ParseCardEndDelimiter" onChange={this.handleEndDelimiterChange} placeholder="End Delimiter"></input></li>
                            <li><input type="CardDeck" data-testid="ParseCardDeck" onChange={this.handleDeckChange} className="CardDeck" placeholder="Deck"></input></li>
                        </ul>
                    </top>
                    <textarea data-testid="ParseCardTextArea" onChange={this.handleParseCardTextAreaChange} placeholder={"Please Type Here:"}></textarea>
                </div>
            </div>
        );
    }
}

export default ParseCard