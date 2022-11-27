import React, {Component} from 'react';
import './Parsecard.css';


class ParseCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localCardDecks: this.props.cardDecks
        }
    }

    render() {
        return (
            <div className="ParseCard">
                <div className="ParseCardInner">
                    <top>
                        <ul>
                            <li><span className="Dot"></span></li>
                            <li><input type="CardHint" value="Notes/Hints"></input></li>
                            <li><input type="CardDeck" className="CardDeck" value="Deck"></input></li>
                        </ul>
                    </top>
                    <textarea>Please Type Here:</textarea>
                </div>
            </div>
        );
    }
}

export default ParseCard