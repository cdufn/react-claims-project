import { Link } from "react-router-dom";
import './Menu.css'

const Menu = (props) => {
    return <ul className="nav">
        <il>
            <Link to="/searchClaims">Search Existing Claims</Link>
        </il>
        <il>
            <Link to="/newClaim">Report a New Claim</Link>
        </il>
        <il>
            <Link to="/openClaims">Display All Claims</Link>
        </il>
    </ul>
}

export default Menu;