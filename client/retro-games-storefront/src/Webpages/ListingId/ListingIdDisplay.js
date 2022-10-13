
// private int id;
// private String name;
// private String description;
// private String imagePath;
// private ListingType listingType;

function ListingIdDisplay({listings} ) {
  return (
    <div>
      <figure>
        {"../../"+ listings.imagePath && (
          <img
            className="card-img-top"
            src={"../../"+ listings.imagePath}
            alt={listings.description}
          />
        )}
        <figcaption>
          <h4>{listings.description}</h4>
          <p>Name: {listings.name}</p>
          <p>Price: {listings.price}</p>
          {/* <p>Release Date: {listing.</p>
          <p>Type: {listing.listingType}</p> */}
        </figcaption>
      </figure>
       <p>Reviews: {listings.reviews}</p>
    </div>
  );
}

export default ListingIdDisplay;
