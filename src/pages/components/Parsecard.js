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
                            <li>
                              <select data-testid="ParseCardStartDelimiter" onChange={this.props.ParseCardStartDelimiterHandler} value={this.props.ParseCardStartDelimiter}>
                              <option value="Start Delimiter">{'Start Delimiter'}</option>
                              <option value="{">{'{'}</option>
                              <option value="[">{'['}</option>
                              </select>
                            </li>      
                            <li>
                              <select data-testid="ParseCardSeparator" onChange={this.props.ParseCardSeparatorHandler} value={this.props.ParseCardSeparator}>
                              <option value="Separator">{'Separator'}</option>
                              <option value=":">{':'}</option>
                              <option value="-">{'-'}</option>
                              </select>
                            </li>
                            <li>
                              <select data-testid="ParseCardEndDelimiter" onChange={this.props.ParseCardEndDelimiterHandler} value={this.props.ParseCardEndDelimiter}>
                              <option value="End Delimiter">{'End Delimiter'}</option>
                              <option value="}">{'}'}</option>
                              <option value="]">{']'}</option>
                              </select>
                            </li>
                            <li><input type="CardDeck" data-testid="ParseCardDeck" onChange={this.props.ParseCardDecksHandler} className="CardDeck" placeholder="Deck" value={this.props.ParseCardDeck}></input></li>
                        </ul>
                    </top>
                    <textarea data-testid="ParseCardTextArea" onChange={this.props.ParseCardTextAreaHandler} placeholder={"Please Type Here:\n\n    Ex. {Term:Definition}"}value={this.props.ParseCardTextArea}></textarea>
                </div>
            </div>
        );
    }
}

export default ParseCard