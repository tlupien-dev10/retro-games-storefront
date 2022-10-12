
// private int id;
// private String name;
// private String description;
// private String imagePath;
// private ListingType listingType;

function ListingIdDisplay({listing} ) {
  return (
    <div>
      <figure>
        {"../../"+ listing.imagePath && (
          <img
            className="card-img-top"
            src={"../../"+ listing.imagePath}
            alt={listing.description}
          />
        )}
        <figcaption>
          <h4>{listing.description}</h4>
          <p>Name: {listing.name}</p>
          <p>Price: {listing.price}</p>
          {/* <p>Release Date: {listing.</p>
          <p>Type: {listing.listingType}</p> */}
        </figcaption>
      </figure>
    //   <p>Reviews: {listing.reviews}</p>
    </div>
  );
}

export default ListingIdDisplay;
