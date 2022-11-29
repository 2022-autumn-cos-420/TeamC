import React, {Component, ReactElement, useCallback, useState, ChangeEvent} from 'react';
import './Importcard.css';


interface Props {
    preview: string
}
interface State {
    dragActive: boolean,
    preview: string
}
class ImportCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            dragActive: false,
            preview: ""
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

    changeHandler = ( target: React.ChangeEvent<HTMLInputElement> ) => {
        if (!target.currentTarget.files){
            return
        }
        const reader = new FileReader();
        reader.addEventListener('load', (evt) => {
            if (reader.result) {
                this.setState({preview: reader.result as string});
            }
        });
      reader.readAsText(target.currentTarget.files[0]);
    };


    render() {
        return (
            <div>
                {/* <div className="ImportCard">
                    <form id="form-file-upload" onDragEnter={() => this.dragHandler} onSubmit={() => {}}></form>
                    <div>Eventually you will drag files here!</div>
                </div> */}
                <input type="file" id="fileUpload" onChange={this.changeHandler} />                
                <div>
                    {this.state.preview}
                </div>
            </div>
        )
    }
}
export default ImportCard;