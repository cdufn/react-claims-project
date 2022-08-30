import { Link } from "react-router-dom";
import './Menu.css'

const Menu = (props) => {

        return <ul className="nav">
            <div>
            <il>
                <Link to="/HomePage">Home</Link>
            </il>
            <il>
                <Link to="/searchClaims">Search Existing Claims</Link>
            </il>
            <il>
                <Link to="/newClaims">Report a New Claim</Link>
            </il>
            <il>
                <Link to="/openClaims">Display New Claims</Link>
            </il>
            </div>
        </ul>
    }

export default Menu;