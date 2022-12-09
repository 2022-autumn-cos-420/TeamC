import React, {Component} from 'react';
import './Parsecard.css';


class ParseCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        localParseCardDeck: props.ParseCardDeck,
        localParseCardStartDelimiter: props.ParseCardStartDelimiter,
        localParseCardEndDelimiter: props.ParseCardEndDelimiter,
        localParseCardSeparator: props.ParseCardSeparator,
        localParseCardTextarea: props.ParseCardTextArea,
      };
    }
  
    handleStartDelimiterChange = (event) => {
      this.setState({ localParseCardStartDelimiter: event.target.value });
      this.props.ParseCardStartDelimiterHandler(event);
    };
  
    handleSeparatorChange = (event) => {
      this.setState({ localParseCardSeparator: event.target.value });
      this.props.ParseCardSeparatorHandler(event);
    };
  
    handleEndDelimiterChange = (event) => {
      this.setState({ localParseCardEndDelimiter: event.target.value });
      this.props.ParseCardEndDelimiterHandler(event);
    };
  
    handleDeckChange = (event) => {
      this.setState({ localParseCardDeck: event.target.value });
      this.props.ParseCardDecksHandler(event);
    };
  
    handleParseCardTextAreaChange = (event) => {
      this.setState({ localParseCardTextarea: event.target.value });
      this.props.ParseCardTextAreaHandler(event);
    };

    render() {
        return (
            <div className="ParseCard" data-testid="parsecard"> 
                <div className="ParseCardInner">
                    <top>
                        <ul>
                            <li><span className="Dot"></span></li>
                            <li><input type="CardHint" data-testid="ParseCardStartDelimiter" onChange={this.handleStartDelimiterChange} placeholder="Start Delimiter" value={this.props.localParseCardStartDelimiter}></input></li>
                            <li><input type="CardHint" data-testid="ParseCardSeparator" onChange={this.handleSeparatorChange} placeholder="Separator"value={this.props.ParseCardSeparator}></input></li>
                            <li><input type="CardHint" data-testid="ParseCardEndDelimiter" onChange={this.handleEndDelimiterChange} placeholder="End Delimiter" value={this.props.localParseCardEndDelimiter}></input></li>
                            <li><input type="CardDeck" data-testid="ParseCardDeck" onChange={this.handleDeckChange} className="CardDeck" placeholder="Deck" value={this.props.ParseCardDeck}></input></li>
                        </ul>
                    </top>
                    <textarea data-testid="ParseCardTextArea" onChange={this.handleParseCardTextAreaChange} placeholder={"Please Type Here:"}value={this.props.ParseCardTextArea}></textarea>
                </div>
            </div>
        );
    }
}

export default ParseCard