import {Link} from "react-router-dom";
import {useState} from "react";
import "./AdminItemHelper";

function AdminItem({listing, handleDelete}) {

    const doNotDelete = function(evt) {
        setDeleteConfirm(false);
      }
    
      const showConfirmForm = function(evt) {
        setDeleteConfirm(true);
      }

    const [deleteConfirm, setDeleteConfirm] = useState(false);

return (
    <tr id="adminItemTableData" key={listing.id}>
      <td>{listing.name}</td>
      <td><img id="tableImage" src={"../../"+ listing.imagePath} alt="" /></td>
      <td id="tablePrice">{listing.price}</td>
      <td id="tableQuantity">{listing.quantity}</td>
      <td className="text-right">
        <Link to={"/admin/edit/" + listing.id}>
          <button
            className="float-start btn btn-sm"
            id="tableEditBtn"
            type = "button"
          >
            Edit
          </button>
        </Link>
    </td>
        
        {!deleteConfirm ?
        <td>
          <button
            className="float-end btn btn-sm btn-danger"
            id="tableDelBtn"
            type="button"
            onClick={showConfirmForm}>
              Delete
          </button>
        </td>
        :
        <td>
          <p id="deleteItemMessage">Delete Listing?</p>
          <button
            className="float-end btn btn-sm"
            id="yesDelete"
            type="button"
            onClick={() => handleDelete(listing.id)}>
            Yes
          </button>
          <button
            className="float-end btn btn-sm"
            id="tableDelBtn"
            type="button"
            onClick={doNotDelete}>
            No
          </button>
        </td>
        }
    
    </tr>
  )
};

export default AdminItem;