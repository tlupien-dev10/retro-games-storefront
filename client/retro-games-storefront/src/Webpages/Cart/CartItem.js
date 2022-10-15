function CartItem({listing, increaseQuantity, decreaseQuantity, deleteItem}) {
    // functions need to be in cart
    return (
        <tr>
            <td>{listing.name}</td>
            <td>{listing.price}</td>
            <td>{listing.orderedQuantity}</td>
            <td>
            { (listing.orderedQuantity + 1 <= listing.quantity) ?
                <button type="button" onClick={() => increaseQuantity(listing.id)}>+</button>:
                <></>
            }
            </td>

            <td>
            { (listing.orderedQuantity > 1) ?
                <button type="button" onClick={() => decreaseQuantity(listing.id)}>-</button> :
                <></>
            }
            </td>

            <td>
                <button type="button" onClick={() => deleteItem(listing.id)}>delete</button>
            </td>
        </tr>
    )
}

export default CartItem;