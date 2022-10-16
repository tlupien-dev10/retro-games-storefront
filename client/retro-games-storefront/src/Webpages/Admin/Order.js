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
        <div className="row">
          <div className="col s12 m6">
            <div className="card" id="orderCard">
              <div className="card-content" id="orderData">
                <span className="card-title" id="orderTitle">Username: {order.customer.username}</span>
                Purchase Summary: {order.listings.map((listing) => (
                    <>
                    <p>{listing.name}</p>
                    <p>Qty: {listing.orderedQuantity}</p>
                    <p>Price: ${listing.price}</p>
                    </>
                    
                ))}
                <p>Order Total: ${order.listings.map((listing) => (
                    listing.orderedQuantity*listing.price)).reduce((a, b) => a + b, 0)}
                </p>
         
                {!deleteConfirm ?
                <button id="orderDelete" className="align-self-end" onClick={showConfirmForm}>Delete</button>
                :
                <>
                  <button id="yesDelete" className="align-self-end" onClick={() => deleteOrder(order.id)}>Yes</button>
                  <button id="noDelete" className="align-self-end" onClick={doNotDelete}>No</button>
                </>
                }
        
              </div>
            </div>
          </div>
        </div>
      );
}

export default Order;