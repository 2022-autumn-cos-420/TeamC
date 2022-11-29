import React, {Component} from 'react';
import './Importcard.css';
import { Form } from "react-bootstrap";


interface Props {
    downloadCollection: (fileName: string) => void
}
interface State {
    fileName: string
}
class ImportCard extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            fileName: ""
        }
    };

    updateFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({fileName: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="ExportCard">
                    {/* <Form.Group controlId="formDownload">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            value={this.state.fileName}
                            onSubmit={this.updateFileName} />
                        </Form.Group> */}
                        <input data-testid="exportLocation" type="text" onChange={ this.updateFileName } value={ this.state.fileName } />
                        <div>
                            The movie is "{this.state.fileName}".
                        </div>
                    <div>
                        <button data-testid="downloadButton" onClick={() => {this.props.downloadCollection(this.state.fileName)}}>Download</button>
                    </div> 
                </div>
            </div>
        )
    }
}

export default ImportCard;