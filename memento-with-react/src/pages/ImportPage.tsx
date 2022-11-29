import React, {useState, Component} from "react";
/*import './ImportPage.css';*/
import ImportCard from './components/Importcard';
// import { FileUploadField } from './components/Importcard';

interface Props {
}
interface State {
}
class ImportPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className= "importPage">
                <ImportCard preview={""} />
            </div>
        )
    }
}

export default ImportPage;