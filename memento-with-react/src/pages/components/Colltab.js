import React, {Component} from 'react';
import './Colltab.css';

class CollTab extends Component{    //Still need to figure out how to pass changes up from the tab!
    constructor(props) {
        super(props)
        this.state = {
            render: false,
            localFrontText: this.props.frontText,
            localBackText: this.props.backText,
            localCardHint: this.props.cardHint,
            localCardDecks: this.props.cardDecks,
        }
        this.toggleContent = this.toggleContent.bind(this);
    }


    toggleContent() { //This currently works although it is quite ugly and doesn't do any animation
        this.setState({render: !this.state.render});
        console.log("Changing the render!", this.state.render);
    }

    handleFrontChange = (event) => {
        this.setState({localFrontText: event.target.value});
    }

    handleBackChange = (event) => {
        this.setState({localBackText: event.target.value});
    }

    handleHintChange = (event) => {
        this.setState({localCardHint: event.target.value});
    }
    
    handleDecksChange = (event) => {
        this.setState({localCardDecks: event.target.value});
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
            <button type="button" onClick={this.toggleContent} className='collapsible'>{this.state.localFrontText}</button>
            <div 
                className="content"
                style={{maxHeight: this.state.render ? '400px': '0px'}}>
                <div className="row">
                    <div className="column">
                        <h>Current Card Values:</h>
                        <p>Front Text: {this.props.frontText}</p>
                        <p>Back Text: {this.props.backText}</p>
                        <p>Card Hint: {this.props.cardHint} </p>
                        <p>Card Decks: {this.props.cardDecks}</p>
                    </div>
                    <div className="column">
                        <h>Please enter new values:</h>
                        <p><input type="text" onChange={this.handleFrontChange} value={this.state.localFrontText}></input></p>
                        <p><input type="text" onChange={this.handleBackChange} value={this.state.localBackText}></input></p>
                        <p><input type="text" onChange={this.handleHintChange} value={this.state.localCardHint}></input></p>
                        <p><input type="text" onChange={this.handleDecksChange} value={this.state.localCardDecks}></input></p>
                    </div>
                </div>
                <div className="CollTabButtons">
                    <button
                        style={buttonStyle}
                        onClick={() => this.props.updated(this.props.frontText, this.props.backText, this.props.cardHint, this.props.cardDecks, this.state.localFrontText, this.state.localBackText, this.state.localCardHint, this.state.localCardDecks)}>Update Card</button>
                    <button
                        className="deleteButton"
                        style={buttonStyle}
                        onClick={() => this.props.deleted(this.props.frontText, this.props.backText, this.props.cardHint)}>Delete Card</button>
                </div>
            </div>
        </div>
    )
    }
};

export default CollTab;