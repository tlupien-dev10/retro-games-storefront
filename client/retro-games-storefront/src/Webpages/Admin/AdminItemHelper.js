import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import AdminItem from "./AdminItem";
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
    fetch("http://localhost:8080/listing/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    })
      .then(async (response) => {
        if (response.status === 204) {
          history.push("/admin/items");
        } else {
          console.log(response);
        }
      })
      .catch((err) => setError([...err]));
  };

    // <div>
    //   <PageErrors errors={error} />
    //   {allListings.map((listing) => (
    //     <AdminItem
    //       key={listing.id}
    //       allListing={listing}
    //       handleDelete={handleDelete}
    //       canEdit={canEdit}
    //       canDelete={canDelete}
    //       canAdd={canAdd}
    //     />
    //   ))}
    // </div>

    return (
      <tbody>
        <tr>
          <th>Item Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th></th>
        </tr>
        {allListings.map((listing) => (
          <tr key={listing.id}>
            <td>{listing.name}</td>
            <td>{listing.price}</td>
            <td>{listing.quantity}</td>
            <td className="text-right">
              <Link to={"/edit/" + id}>
                <button
                  className="float-start btn btn-sm btn-success"
                  id="editBtn"
                >
                  Edit
                </button>
              </Link>
              <button
                className="float-end btn btn-sm btn-danger"
                id="delBtn"
                onClick={() => handleDelete(listing.id)}>Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>

  );
}

export default AdminItemHelper;
