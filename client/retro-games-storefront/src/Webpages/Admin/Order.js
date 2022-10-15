import "./Order.css";

function Order({order, deleteOrder}){

    return (
        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1" id="orderCard">
              <div className="card-content white-text" id="orderData">
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
              </div>
              <div className="card-action">
                <button onClick={() => deleteOrder(order.id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Order;