import ReviewForm from "./ReviewForm";
import {useState} from "react";

function Review({review, getListing}) {

    // needs an edit button only visible if author id = auth user id
    // needs delete button only visible for author id match + admin

    const [clicked, setClicked] = useState(false);

    const setClickedFromSubmit = function() {
        setClicked(false);
        getListing();
    }

    return (
        <>
        <p>{review.title}</p>
        <p>{review.rating}</p>
        <p>{review.author.username}</p>
        <p>{review.description}</p>
        <button type="button" onClick={() => setClicked(true)}>Edit</button>
        {clicked ?
        <ReviewForm listingId={review.listing} clickFix={setClickedFromSubmit} startingReview={review}/> :
        <></>}
        </>
    )
}

export default Review;