import {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import Order from "./Order";
import "./AdminOrder.css";

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
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else if (res.status === 403) {
                history.push("/forbidden")
            } else {
                return Promise.reject("Could not connect to api");
            }
        })
        .then((data) => setAllOrders(data))
        .catch((errList) => {
            if (errList instanceof TypeError){
              setError(["Could not connect to api"])
            } else {
            setError([...errList])}});
      };

    useEffect(() => {
        return getAllOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    function deleteOrder(orderId){
        fetch("http://localhost:8080/api/order/" + orderId, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            },
        })
        .then(async res => {
            if (res.status === 204) {
                
                getAllOrders();
            } else if (res.status === 403) {
                history.push("/forbidden")
            } else {
                return Promise.reject(await res.json());
            }
        })
        .catch((errList) => {
            if (errList instanceof TypeError){
              setError(["Could not connect to api"])
            } else {
            setError([...errList])}});
      };

    
return (
    <div>
        <h5 id="adminOrderPageTitle">Order History</h5>
        <PageErrors errors={error} />
        {allOrders.map((orders) => (
            <Order key={orders.id} order={orders} deleteOrder={deleteOrder}/>
        ) )}
    </div>
    


);
}

export default AdminOrder;