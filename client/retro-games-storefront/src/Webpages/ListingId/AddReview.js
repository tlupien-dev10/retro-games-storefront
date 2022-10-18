import { useState } from "react"
import ReviewForm from './ReviewForm';

function AddReview({listingId, getListing}) {
    // button for add review
    // if clicked, swap in a form
    // form is controlled component updating a review
    // the form is add/edit, so it comes from ReviewForm, this is just the button for add
    // listing id comes from prop, author id from auth context
    // makes you log in if not already logged in
    const [clicked, setClicked] = useState(false);

    const setClickedFromSubmit = function() {
        setClicked(false);
        getListing();
    }

    return (
        <>
            <button type="button" onClick={() => setClicked(!clicked)}>Add Review</button>
            {clicked ? 
            <ReviewForm listingId={listingId} clickFix={setClickedFromSubmit}/> :
            <></>}
        </>
    )
}

export default AddReview