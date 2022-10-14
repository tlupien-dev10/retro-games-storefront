function Order({allOrders}){

    return (
        <div className="row">
          <div className="col s12 m7">
            <div className="card">
         
              <div className="card-content">
                <p>Username: {allOrders.customer.username} </p>
                <p>Listing: {allOrders.listings.name}</p>
                <p>Quantity:</p>
                <p>Order Total:</p>
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