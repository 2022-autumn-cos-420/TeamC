import React, {Component} from 'react';
import './Deckcard.css';
import styled from 'styled-components';

class DeckCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            localDeckName: this.props.deckName
        }
    }

    downloadHandler = (event) => {
        console.log("Handling download from: ", this.state.localDeckName);
        this.props.download(this.state.localDeckName);
    }

    studyHandler = (event) => {
        console.log("Handling study from: ", this.state.localDeckName);
        this.props.study(this.state.localDeckName);
    }

    render() {
        return (
            <div className = "DeckCard">
                <div className="DeckCardInner">
                    <div className="DeckDot"></div>
                    <div className="DeckName" data-testid="DeckName" onClick={() => this.studyHandler()}>{this.props.deckName}</div>
                    <button className="DownloadButton" src={`./DownloadButton.png`} onClick={() => this.downloadHandler()}></button>
                </div>
            </div>
        )
    }
}




export default DeckCard