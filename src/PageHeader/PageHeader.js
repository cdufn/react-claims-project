import Menu from './Menu';
import './PageHeader.css'
import { Link } from 'react-router-dom';

const PageHeader = (props) => {

    return (
        <div className="pageHeader">

            <img src="allstatelogo.png" />

            <br />

            <h>Welcome to the Allstate Small Claims Site</h>

            <br />

            <ul>
                <il>
                    <Link to="/searchClaims">Search Existing Claims</Link>
                </il>
                <il>
                    <Link to="/newClaim">Report a New Claim</Link>
                </il>

            </ul>

        </div>
    )

};

export default PageHeader;