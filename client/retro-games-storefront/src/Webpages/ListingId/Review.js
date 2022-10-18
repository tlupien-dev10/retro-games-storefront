import ReviewForm from "./ReviewForm";
import {useState} from "react";
import useAuth from "../../Components/Hooks/useAuth";

function Review({review, getListing}) {

    // needs an edit button only visible if author id = auth user id
    // needs delete button only visible for author id match + admin
    const auth = useAuth();

    const [clicked, setClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);

    const deleteIt = function() {
        console.log(review.id)
        fetch(`http://localhost:8080/api/review/${review.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            }
        })
        .then(res => {
            if (res.status === 204) {
                console.log("success");
                getListing();
            } else {
                return Promise.reject(res.json());
            }
        })
        .catch(err => console.log(err));
      };

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
        {!deleteClicked ?
        <button type="button" onClick={() => setDeleteClicked(true)}>Delete</button> :
        <>
            <button type="button" onClick={deleteIt}>Yes</button>
            <button type="button" onClick={() => setDeleteClicked(false)}>Cancel</button>
        </>
        }
        </>
    )
}

export default Review;