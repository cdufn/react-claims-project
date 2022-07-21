import { Link } from "react-router-dom";

const doSomething = () => {

}

const Menu = (props) => {
    return <ul className="nav">
        <li style={{cursor: "pointer"}} ><Link to="/find">Search Existing Claims</Link></li>
        <li style={{cursor: "pointer"}} ><Link to="/new">New Claim</Link></li>
    </ul>
}

export default Menu;