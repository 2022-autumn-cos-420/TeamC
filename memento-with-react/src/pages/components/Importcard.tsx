import React, {Component, ReactElement, useCallback, useState, ChangeEvent} from 'react';
import './Importcard.css';
import { Card } from "../../interfaces/card";
import { equal } from "assert";
import { exportCards, importCards } from '../../importExport';

interface Props {
    collection: Card[],
    parseInputs: (textInput: string, currentCollection: Card[], deckName: string) => Card[],
    updateCollection: (childCollection: Card[]) => void
}
interface State {
    dragActive: boolean,
    collection: Card[]
}
class ImportCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            dragActive: false,
            collection: this.props.collection
        }
    };

    // dragHandler = (event: React.DragEvent) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     if (event.type === "dragenter" || event.type === "dragover") {
    //         this.setState({dragActive: true});
    //     } else if (event.type === "dragleave") {
    //         this.setState({dragActive: false});
    //     }
    // };

    // dropHandler = (event: React.ChangeEvent) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     this.setState({dragActive: false});
    //     // if (event.dataTransfer.files && event.dataTransfer.files[0]) {
    //     //     //Handle files event.dataTransfer.files
    //     //     console.log("File drop!");
    //     // }
    // }


    //Split this into its own function so that the function made by reader.onload can access "this" and its state
    //  There might well be a cleaner way to do it though
    readerChange(result: string) {
        // console.log("Parsed state length: " + this.props.parseInputs(result, this.state.collection, "").length);
        this.setState({collection: this.props.parseInputs(result, this.state.collection, "")}, () => {
            this.props.updateCollection(this.state.collection)
        }
        );
        // console.log("Updated state length: " + this.state.collection.length);
    }

    changeHandler = ( target: React.ChangeEvent<HTMLInputElement> ) => {
        if (!target.currentTarget.files){
            return
        }
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result) {
                this.readerChange(reader.result as string)
            }
        };
        // reader.addEventListener('load', (evt) => {
        //     if (reader.result) {
        //         this.setState({collection: this.props.parseInputs(reader.result as string, this.state.collection, "")});
        //         console.log("ImportCard state length: " + this.state.collection.length);
        //         this.props.updateCollection(this.state.collection);
        //     }
        // });
        reader.readAsText(target.currentTarget.files[0]);
    };


    render() {
        return (
            <div>
                {/* <div className="ImportCard">
                    <form id="form-file-upload" onDragEnter={() => this.dragHandler} onSubmit={() => {}}></form>
                    <div>Eventually you will drag files here!</div>
                </div> */}
                <input data-testid="fileUpload" type="file" id="fileUpload" onChange={this.changeHandler} />                
                <div>
                    {this.state.collection.length}
                </div>
            </div>
        )
    }
}
export default ImportCard;