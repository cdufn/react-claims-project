import Menu from './Menu';
import './PageHeader.css'

const PageHeader = (props) => {

    return(
        <div className="pageHeader">
         
        <img src="allstatelogo.png"/>

        <br/>

        <h>Welcome to the Allstate Small Claims Site</h>

        <br/>
        
        <ul>
        <li style={{cursor: "pointer"}}>Search Existing Claims</li>
        <li style={{cursor: "pointer"}}>New Claim</li>
       
        </ul>

        </div>
    )

};

export default PageHeader;