import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./ListingId.css";
import useAuth from "../../Components/Hooks/useAuth";
import PageErrors from "../../Components/PageErrors/PageErrors";
import Review from "./Review";
import AddReview from "./AddReview";
import AddToCartButton from "../Listing/AddToCartButton";

function ListingId({cartListings, setCartListings}) {
  const [listing, setListing] = useState({ reviews: [] });
  const [error, setError] = useState([]);
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [consoles, setConsoles] = useState([]);

  const auth = useAuth();
  const history = useHistory();

  function getListing() {
    fetch("http://localhost:8080/api/listing/" + id)
      .then((response) => response.json())
      .then((data) => {
        // 
        
        return setListing(data);
      })
      .catch((err) => setError([...err]));
  }

  useEffect(() => getListing(), []);

  function getGame() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => {
        return setGame(data);
      })
      .catch((err) => setError([...err]));
  }

  useEffect(() => getGame(), []);

  function getConsoles() {
    fetch("http://localhost:8080/api/listing")
      .then((response) => response.json())
      .then((data) => {
        setConsoles(data.filter(l => l.console));
      })
      .catch((err) => setError([...err]));
  }

useEffect(() => getConsoles(), []);

  return (
    <div>
      <PageErrors errors={error} />
      <div>
        <figure>
          {"../../" + listing.imagePath && (
            <img
              className="card-img-top"
              id="listingIdImg"
              src={"../../" + listing.imagePath}
              alt={""}
            />
          )}
          <figcaption id="listingIdText">
            <h4>{listing.name}</h4>
            <p>Type: {listing.listingType}</p>
            <p>Description: {listing.description}</p>
            <p id="listingIdPrice">Price: ${listing.price}</p>
            {listing.listingType === "GAME" ? (
              <div> {//{
              }
                Genre: {listing.game.genre} <br></br>Publisher:{" "} 
                {listing.game.publisher}
                <br></br>Release Date: {listing.game.releaseDate}
              </div>
            ) : (
              <></>
            )}
            {listing.listingType === "CONSOLE" ? (
              <p>
                Version: {listing.console.version} <br></br>Company:{" "}
                {listing.console.company}
                <br></br>Release Date: {listing.console.releaseDate}
              </p>
            ) : (
              <></>
            )}
            {listing.listingType === "MERCHANDISE" ? (
              <p>
                Category: {listing.merchandise.category}
              </p>
            ) : (
              <></>
            )}
       
            <AddToCartButton listing={listing} setListing={setListing} cartListings={cartListings} setCartListings={setCartListings} />
          </figcaption>
        </figure>
        <div id="reviews">
        <AddReview listingId={listing.id} getListing={getListing} />
          <h5>Reviews:</h5>
          {listing.reviews.map((r) => (
            <Review review={r} getListing={getListing} setError={setError}/>
          ))}
        </div>
      
      </div>
    </div>
  );
}

export default ListingId;
