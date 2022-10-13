// import { useContext, useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

// import FormHelper from "../../Components/Forms/FormHelper";
// import AuthContext from "../../Components/AuthContext/AuthContext";

import {Link, useParams} from "react-router-dom";

function AdminItem({ allListing, handleDelete, canAdd, canEdit, canDelete }) {
  const {id} = useParams();
  
  return (
    <div>
      <table className="responsive-table">
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
            <td>{allListing.name}</td>
            <td>{allListing.price}</td>
            <td>{allListing.quantity}</td>
            <td className="text-right">
              {canEdit && (
              <Link to={"/edit/" + id}>
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
                onClick={() => handleDelete(allListing.id)}>Delete
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
