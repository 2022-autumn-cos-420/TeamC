import React, {Component} from 'react';
import './Importcard.css';


class ImportCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dragActive: false
        }
    };

    dragHandler = (event) => {
        event.preventDefault();
        event.stopPropogation();
        if (event.type === "dragenter" || event.type === "dragover") {
            this.setState({dragActive: true});
        } else if (event.type === "dragleave") {
            this.setState({dragACtive: false});
        }
    };

    dropHandler = (event) => {
        event.preventDefault();
        event.stopPropogation();
        this.setState({dragACtive: false});
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            //Handle files event.dataTransfer.files
            console.log("File drop!");
        }
    }

    changeHandler = (event) => {
        event.preventDefault();
        if (event.target.files && event.target.files[0]) {
            //Handle files event.target.files
        }
    }



    render() {
        return (
            <div>
                <div className="ImportCard">
                    <form id="form-file-upload" onDragEnter={() => this.dragHandler} onSubmit={() => this.preventDefault()}></form>
                    <div>Eventually you will drag files here!</div>
                </div>
            </div>
        )
    }
}

export default ImportCard;