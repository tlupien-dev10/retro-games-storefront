import "./Review.css";
function Review({review}) {

    // needs an edit button only visible if author id = auth user id
    // needs delete button only visible for author id match + admin

    return (
        <>
        <p id="review">{review.author.username + ": "}{review.title}{" " + review.rating}<br></br>{review.description}</p>
        </>
    )
}

export default Review;