import React, {Component} from 'react';
import './Colltab.css';

class CollTab extends Component{    //Still need to figure out how to pass changes up from the tab!
    constructor(props) {
        super(props)
        this.state = {
            render: false,
            localCard: this.props.card

        }
        this.toggleContent = this.toggleContent.bind(this);
    }


    toggleContent() { //This currently works although it is quite ugly and doesn't do any animation
        this.setState({render: !this.state.render});
        console.log("Changing the render!", this.state.render);
    }

    handleFrontChange = (event) => {
        this.setState({localCard: {...this.state.localCard, frontText: event.currentTarget.value}});
    }

    handleBackChange = (event) => {
        this.setState({localCard: {...this.state.localCard, backText: event.currentTarget.value}});
    }

    handleHintChange = (event) => {
        this.setState({localCard: {...this.state.localCard, cardHint: event.currentTarget.value}});
    }
    
    handleDecksChange = (event) => {
        this.setState({localCard: {...this.state.localCard, cardDecks: [event.currentTarget.value]}});
    }


    render() {
        const buttonStyle = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
    return (
        <div className="CollTab">
            <button type="button" onClick={this.toggleContent} className='collapsible'>{this.state.localCard.frontText}</button>
            <div 
                className="content"
                style={{maxHeight: this.state.render ? '400px': '0px'}}>
                <div className="row">
                    <div className="column">
                        {/* <h>Current Card Values:</h> */}
                        <p>Current Card Values:</p>
                        <p data-testid="CollTabFrontText">Front Text: {this.props.card.frontText}</p>
                        <p data-testid="CollTabBackText">Back Text: {this.props.card.backText}</p>
                        <p data-testid="CollTabCardHint">Card Hint: {this.props.card.cardHint} </p>
                        <p data-testid="CollTabCardDecks">Card Decks: {this.props.card.cardDecks}</p>
                        <p>Card Accuracy: {this.props.card.accuracy}</p>
                    </div>
                    <div className="column">
                        <p>Please enter new values:</p>
                        {/* <h>Please enter new values:</h> */}
                        <p><input type="text" onChange={this.handleFrontChange} value={this.state.localCard.frontText}></input></p>
                        <p><input type="text" onChange={this.handleBackChange} value={this.state.localCard.backText}></input></p>
                        <p><input type="text" onChange={this.handleHintChange} value={this.state.localCard.cardHint}></input></p>
                        <p><input type="text" onChange={this.handleDecksChange} value={this.state.localCard.cardDecks}></input></p>
                    </div>
                </div>
                <div className="CollTabButtons">
                    <button
                        style={buttonStyle}
                        onClick={() => this.props.updated(this.props.card, this.state.localCard.frontText, this.state.localCard.backText, this.state.localCard.cardHint, this.state.localCard.cardDecks)}>Update Card</button>
                    <button
                        className="deleteButton"
                        style={buttonStyle}
                        onClick={() => this.props.deleted(this.props.card)}>Delete Card</button>
                </div>
            </div>
        </div>
    )
    }
};

export default CollTab;