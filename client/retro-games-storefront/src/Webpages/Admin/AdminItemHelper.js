import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";


import "./AdminItemHelper.css";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import AdminItem from "./AdminItem";

function AdminItemHelper() {
  const [allListings, setallListings] = useState([]);
  const [error, setError] = useState([]);

  const auth = useAuth();
  const history = useHistory();

  const canAdd = auth.user && auth.user.hasRole("ADMIN");
  const canEdit = auth.user && auth.user.hasRole("ADMIN");
  const canDelete = auth.user && auth.user.hasRole("ADMIN");


  function getAllListings() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => setallListings(data))
      .catch((errList) => {
        if (errList instanceof TypeError){
          setError(["Could not connect to api"])
        } else {
        setError([...errList])}});
  }
  

  useEffect(() => getAllListings(), [allListings.length]);



  const handleDelete = (id) => {
    fetch("http://localhost:8080/api/listing/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    })
      .then(async (res) => {
        if (res.status === 204) {
          history.push("/admin/items");
          getAllListings();
        } else if (res.status === 403) {
          history.push("/forbidden")
        } else {
          
        }
      })
      .catch((errList) => {
        if (errList instanceof TypeError){
          setError(["Could not connect to api"]);
        } else {
        setError([...errList])}});
  };

    return (
      <div id="adminTable">
      <table className="striped" id="adminItemTable">
      <tbody>
        <tr id="adminItemTitle">
          <th>Item Name</th>
          <th>Display Image</th>
          <th>Price</th>
          <th id="quantityHeader">Quantity</th>
          <th></th>
          <th className="text-center">{canAdd && (
          <Link to={"/admin/add"}>
                <button
                  className="float-end btn btn-sm btn-success"
                  id="tableAddBtn"
                >
                  New Listing
                </button></Link>)}
                </th>
        </tr>
        {allListings.map((listing) => <AdminItem key={listing.id} listing={listing} handleDelete={() => handleDelete(listing.id)}/>)}
        </tbody>
        </table>
        <PageErrors errors={error} />
        </div>
  );
}

export default AdminItemHelper;
