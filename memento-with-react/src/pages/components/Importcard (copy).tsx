import React, {Component} from 'react';
import './Importcard.css';


interface Props {
}
interface State {
}
class ImportCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            dragActive: false
        }
    };

    dragHandler = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            this.setState({dragActive: true});
        } else if (event.type === "dragleave") {
            this.setState({dragACtive: false});
        }
    };

    dropHandler = (event: React.ChangeEvent) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({dragActive: false});
        // if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        //     //Handle files event.dataTransfer.files
        //     console.log("File drop!");
        // }
    }

    // changeHandler = (event: React.DragEvent) => {
    //     event.preventDefault();
    //     // if (event.target.files && event.target.files[0]) {
    //     //     //Handle files event.target.files
    //     // }
    // }



    render() {
        return (
            <div>
                <div className="ImportCard">
                    <form id="form-file-upload" onDragEnter={() => this.dragHandler} onSubmit={() => {}}></form>
                    <div>Eventually you will drag files here!</div>
                </div>
            </div>
        )
    }
}

export default ImportCard;