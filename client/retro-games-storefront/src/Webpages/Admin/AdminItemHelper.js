import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import AdminItem from "./AdminItem";
import "./AdminItemHelper.css";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";

function AdminItemHelper() {
  const [allListings, setallListings] = useState([]);
  const [error, setError] = useState([]);
  const { id } = useParams();

  const auth = useAuth();
  const history = useHistory();

  const canAdd = auth.user && auth.user.hasRole("ADMIN");
  const canEdit = auth.user && auth.user.hasRole("ADMIN");
  const canDelete = auth.user && auth.user.hasRole("ADMIN");

  function getAllListings() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => setallListings(data))
      .catch((err) => setError([...err]));
  }

  useEffect(() => getAllListings(), []);

  const handleDelete = (id) => {
    // THIS NEEDS A CONFIRM!!
    fetch("http://localhost:8080/api/listing/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    })
      .then(async (response) => {
        if (response.status === 204) {
          history.push("/admin/items");
          getAllListings();
        } else {
          console.log(response);
        }
      })
      .catch((err) => setError([...err]));
  };

    return (
      <div id="adminTable">
      <table className="striped" id="adminItemTable">
      <tbody>
        <tr>
          <th>Item Name</th>
          <th>Display Image</th>
          <th>Price</th>
          <th>Quantity</th>
          <th className="text-center">{canAdd && (
          <Link to={"/admin/add"}>
                <button
                  className="float-start btn btn-sm btn-success"
                  id="editBtn"
                >
                  Add New Listing
                </button></Link>)}
                </th>
        </tr>
        {allListings.map((listing) => (
          <tr key={listing.id}>
            <td>{listing.name}</td>
            <td> <img id="tableImage" src={"../../"+ listing.imagePath} alt="" /></td>
            <td>{listing.price}</td>
            <td>{listing.quantity}</td>
            <td className="text-right">
            {canEdit && (
              <Link to={"/edit/" + id}>
                <button
                  className="float-start btn btn-sm btn-success"
                  id="editBtn"
                  type = "button"
                >
                  Edit
                </button>
              </Link>
              )}
              {canDelete && (
              <button
                className="float-end btn btn-sm btn-danger"
                id="delBtn"
                type="button"
                onClick={() => handleDelete(listing.id)}>Delete
              </button>
              )}
            </td>
          </tr>
        ))}
        </tbody>
        </table>
        <PageErrors errors={error} />
        </div>
  );
}

export default AdminItemHelper;
