function Order({order}){


    return (
        <div className="row">
          <div className="col s12 m7">
            <div className="card">
         
              <div className="card-content">
                <p>Username: {order.customer.username} </p>
                Listing: {order.listings.map((listing) => (
                    <>
                    <p>{listing.name}</p>
                    <p>Qty:{listing.orderedQuantity}</p>
                    <p>Price:{listing.price}</p>
                    </>
                    
                ))}
                <p>Order Total:{order.listings.map((listing) => (
                    listing.orderedQuantity*listing.price)).reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="card-action">
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Order;