import {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import Order from "./Order";

// import FormHelper from "../../Components/Forms/FormHelper"
// import AuthContext from "../../Components/AuthContext/AuthContext";


function AdminOrder() {
    const [allOrders, setAllOrders] = useState([]);
    const [error, setError] = useState([]);
    const auth = useAuth();
    const history = useHistory();

    function getAllOrders(){
        fetch("http://localhost:8080/api/order", {
            headers :{
            Authorization: `Bearer ${auth.user.token}`
            }
        })
        .then((response) => response.json())
        .then((data) => setAllOrders(data))
        .catch((err) => setError([...err]));
    }

    useEffect(() => getAllOrders(), []);
    console.log(allOrders);

    function deleteOrder(orderId){
        fetch("http://localhost:8080/api/order/" + orderId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        })
        .then(async response => {
            if (response.status === 204) {
                console.log("success");
                getAllOrders();
                
            } else {
                return Promise.reject(await response.json());
            }
        })
        .catch((error) => console.log(error));
    }
    
return (
    <div><h5>Order History</h5>
        <PageErrors errors={error} />
        {allOrders.map((orders) => (
            <Order key={orders.id} order={orders} deleteOrder={deleteOrder}/>
        ) )}
    </div>


);
}

export default AdminOrder;