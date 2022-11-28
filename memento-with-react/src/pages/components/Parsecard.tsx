import React, {Component} from 'react';
import './Parsecard.css';

interface Props {
    cardDeck: string;
}
interface State {
    localCardDeck: string;
}

class ParseCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            localCardDeck: this.props.cardDeck
        }
    }

    render() {
        return (
            <div className="ParseCard">
                <div className="ParseCardInner">
                    {/* <top> */}
                    <ul>
                        <li><span className="Dot"></span></li>
                        <li><input type="CardHint" value="Notes/Hints"></input></li>
                        <li><input type="CardDeck" className="CardDeck" value="Deck"></input></li>
                    </ul>
                    {/* </top> */}
                    <textarea>Please Type Here:</textarea>
                </div>
            </div>
        );
    }
}

export default ParseCard