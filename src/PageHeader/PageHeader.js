import './PageHeader.css'
import { Link } from 'react-router-dom';

const PageHeader = (props) => {

    return (
        <div className="pageHeader">

        <img src="allstatelogo.png" alt="Allstate Image Logo" />

            <br />

            <h1>Welcome to the Allstate Small Claims Site</h1>

            <br />

        </div>
    )

};

export default PageHeader;