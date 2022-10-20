import ReviewForm from "./ReviewForm";
import {useState} from "react";
import useAuth from "../../Components/Hooks/useAuth";
import "./Review.css";
function Review({review, getListing, setError}) {

    // needs an edit button only visible if author id = auth user id
    // needs delete button only visible for author id match + admin
    const auth = useAuth();

    const [clicked, setClicked] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);

    const deleteIt = function() {
        
        fetch(`http://localhost:8080/api/review/${review.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
            }
        })
        .then(res => {
            if (res.status === 204) {
                
                getListing();
            } else {
                return Promise.reject(res.json());
            }
        })
        .catch(err => {
            if (err instanceof TypeError) {
              setError("Could not connect to api");
            } else {
              setError(err);
            }
          });
      };

    const setClickedFromSubmit = function() {
        setClicked(false);
        getListing();
    }

    return (
        <div id="reviewInfo">
        <p>{review.author.username}
        {": " + review.title + " "}
        {review.rating + "/5"} { auth.user && (auth.user.hasRole("ADMIN") || auth.user.username == review.author.username)?
            <>
                {!deleteClicked ?
                <button id="delReviewBtn" type="button" className = "waves-effect waves-light btn-small" onClick={() => setDeleteClicked(true)}>Delete</button> :
                <>
                    <button id="delConfirmNo" type="button" className = "waves-effect waves-light btn-small" onClick={() => setDeleteClicked(false)}>Cancel</button>
                    <button id="delConfirmYes" type="button" className = "waves-effect waves-light btn-small" onClick={deleteIt}>Yes</button>
                </>
                }
            </> :
            <></>
        }</p>
       
        <p>{review.description}</p>
        <br></br>
        {auth.user && auth.user.username == review.author.username ?
            <button id="editReviewBtn" type="button" className = "waves-effect waves-light btn-small" onClick={() => setClicked(true)}>Edit</button> :
            <></>
        }

        {clicked ?
        <ReviewForm listingId={review.listing} clickFix={setClickedFromSubmit} startingReview={review}/> :
        <></>}

       
        </div>
     )
}

export default Review;