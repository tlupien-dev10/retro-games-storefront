// import { useContext, useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// import FormHelper from "../../Components/Forms/FormHelper";
// import AuthContext from "../../Components/AuthContext/AuthContext";

import {Link} from "react-router-dom";

function AdminItem({ listing, handleDelete, canAdd, canEdit, canDelete }) {

  
  return (
    <div>
      <h1>Welcome to the Admin Inventory Page!</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{listing.name}</td>
            <td>{listing.price}</td>
            <td>{listing.quantity}</td>
            <td className="text-right">
              {canEdit && (
              <Link to={`/edit/${listing.id}`}>
                <button
                  className="float-start btn btn-sm btn-success"
                  id="editBtn"
                >
                  Edit
                </button>
              </Link>
              )}
              {canDelete && (
              <button
                className="float-end btn btn-sm btn-danger"
                id="delBtn"
                onClick={() => handleDelete(listing.id)}>Delete
              </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminItem;
