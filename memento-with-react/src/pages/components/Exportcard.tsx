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
            fileName: "jestTestFile.txt"
        }
    };


    updateFileName(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({fileName: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="ExportCard">
                    <Form.Group controlId="formDownload">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            value={this.state.fileName}
                            onChange={this.updateFileName} />
                        </Form.Group>
                        <div>
                        The movie is "{this.state.fileName}".
                    </div>
                    <div>
                        <button onClick={() => {this.props.downloadCollection(this.state.fileName)}}>Download</button>
                    </div> 
                </div>
            </div>
        )
    }
}

export default ImportCard;