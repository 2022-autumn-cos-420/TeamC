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

    render() {
        return (
            <div className = "DeckCard">
                <div className="DeckCardInner">
                    <div className="DeckDot"></div>
                    <div className="DeckName" data-testid="DeckName" onClick={() => this.studyHandler()}>{this.props.deckName}</div>
                    <button className="DeleteDeckButton" src={`https://file.rendit.io/n/AWXeYQKewibNjaYdcviF.svg`} onClick={() => this.deleteHandler()}></button>
                    <button className="DownloadButton" src={`./DownloadButton.png`} onClick={() => this.downloadHandler()}></button>
                </div>
            </div>
        )
    }
}




export default DeckCard