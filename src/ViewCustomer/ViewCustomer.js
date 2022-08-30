import { useParams } from "react-router";
import { getCustomer } from "../Data/Data";

const ViewCustomer = () => {

    const params = useParams();
    getCustomer(params.id)
        .then(response => {
            console.log(response.data);
        });
            
            



    return(
        <p></p>
    );

}

export default ViewCustomer;