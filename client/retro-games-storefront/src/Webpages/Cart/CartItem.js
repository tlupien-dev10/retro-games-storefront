import "./CartItem.css"

function CartItem({listing, increaseQuantity, decreaseQuantity, deleteItem}) {
    // functions need to be in cart

    //not sure if we want to keep, but the className for the Increase and Decrease
    //Quantity buttons is what causes the color to change to white when you click it 3 times
    return (
        <tr>
            <td id="cartProduct">{listing.name}</td>
            <td id="cartPrice">${listing.price}</td>
            <td id="cartQuantity">qty: {listing.orderedQuantity}</td>
            <td>
            { (listing.orderedQuantity + 1 <= listing.quantity) ?
                <button id="increaseBtn" type="button" className="btn-small waves-effect waves-light" onClick={() => increaseQuantity(listing.id)}>+1</button>:
                <></>
            }
            </td>

            <td>
            { (listing.orderedQuantity > 1) ?
                <button id="decreaseBtn" type="button" className="btn-small waves-effect waves-light" onClick={() => decreaseQuantity(listing.id)}>-1</button> :
                <></>
            }
            </td>

            <td id="cartDelBtn">
                <button type="button" className="btn-small waves-effect waves-light red" onClick={() => deleteItem(listing.id)}>delete</button>
            </td>
        </tr>
    )
}

export default CartItem;