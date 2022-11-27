import React, {useState, Component} from "react";
/*import './ImportPage.css';*/
import ImportCard from './components/Importcard.js';


class ImportPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ImportCard></ImportCard>
            </div>
        )
    }
}

export default ImportPage;