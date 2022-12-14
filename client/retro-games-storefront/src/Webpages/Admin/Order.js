import "./Order.css";
import {useState} from "react";

function Order({order, deleteOrder}){

  const doNotDelete = function(evt) {
    setDeleteConfirm(false);
  }

  const showConfirmForm = function(evt) {
    setDeleteConfirm(true);
  }

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Should we change the Delete button to a small red X at the top right
  //of the card so regardless of card contents, all would appear the same
    return (
        <div id="order1" className="row">
          <div id="order2" className="col s12 m6">
            <div className="card" id="orderCard">
              <div className="card-content" id="orderData">
                <p id="orderNum">Order: {order.id}</p>
                <span className="card-title" id="orderTitle">Username: {order.customer.username}</span>
                 {!deleteConfirm ?
                <button id="orderDelete" className="btn-small waves-effect waves-light" onClick={showConfirmForm}>Delete</button>
                :
                <>
                <p id="deleteOrderConfirm">Are you sure you want to delete?</p>
                <br></br>
                  <button id="noDeleteOrder" className="align-self-end btn-small waves-effect waves-light" onClick={doNotDelete}>No</button>
                  <button id="yesDeleteOrder" className="align-self-end btn-small waves-effect waves-light" onClick={() => deleteOrder(order.id)}>Yes</button>
                </>
                }
                <table className="striped" id="adminOrderTable">
                        <thead>
                        <tr id="adminOrderTableHeaders">
                          <th id="adminOrderPrd">Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          </tr>
                          </thead>
                          {order.listings.map((listing) => (
                          <tbody>
                            <tr id="orderTableData">
                    <td>{listing.name}</td>
                    <td id="adminOrderQty">{listing.orderedQuantity}</td>
                    <td>{listing.price}</td>
                    </tr>
                    </tbody>   
                ))}
                 </table>
                <p id="orderTotal"> Order Total: ${order.listings.map((listing) => (
                    listing.orderedQuantity*listing.price)).reduce((a, b) => a + b, 0).toFixed(2)}
                </p>
              </div>
            </div> 
          </div>
        </div>
      );
}

export default Order;