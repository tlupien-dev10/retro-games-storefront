import "./CartItem.css"

function CartItem({listing, increaseQuantity, decreaseQuantity, deleteItem}) {
    // functions need to be in cart
    return (
        <tr>
            <td>{listing.name}</td>
            <td>{listing.price}</td>
            <td>{listing.orderedQuantity}</td>
            <td>
            { (listing.orderedQuantity + 1 <= listing.quantity) ?
                <button id="increaseBtn" type="button" className="btn-small waves-effect waves-light" onClick={() => increaseQuantity(listing.id)}>+</button>:
                <></>
            }
            </td>

            <td>
            { (listing.orderedQuantity > 1) ?
                <button type="button" className="btn-small waves-effect waves-light" onClick={() => decreaseQuantity(listing.id)}>-</button> :
                <></>
            }
            </td>

            <td>
                <button type="button" className="btn-small waves-effect waves-light red" onClick={() => deleteItem(listing.id)}>delete</button>
            </td>
        </tr>
    )
}

export default CartItem;