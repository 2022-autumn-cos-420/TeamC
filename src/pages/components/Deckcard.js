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
        console.log("Handling download from DeckCard: ", this.props.deckName);
        this.props.download(this.props.deckName);
    }

    studyHandler = (event) => {
        console.log("Handling study from DeckCard: ", this.props.deckName);
        this.props.study(this.props.deckName);
    }

    deleteHandler = (event) => {
        console.log("Handling delete from DeckCard: ", this.props.deckName);
        this.props.delete(this.props.deckName);

    }

    editHandler = (event) => {
        console.log("Handling edit from Deckcard: ", this.props.deckName);
        this.props.edit(this.props.deckName);
    }

    render() {
        return (
            <div className = "DeckCard">
                <div className="DeckCardInner">
                    <div className="DeckDot"></div>
                    <button className="EditDeckButton" data-testid={"EditDeckButton:" + this.props.deckName} onClick={() => this.editHandler()}></button>
                    <div className="DeckName" data-testid={this.props.deckName} onClick={() => this.studyHandler()}>{this.props.deckName}</div>
                    <button className="DeleteDeckButton" data-testid={"DeleteDeckButton:" + this.props.deckName} onClick={() => this.deleteHandler()}></button>
                    <button className="DownloadButton" data-testid="DownloadDeckButton" src={`./DownloadButton.png`} onClick={() => this.downloadHandler()}></button>
                </div>
            </div>
        )
    }
}




export default DeckCard