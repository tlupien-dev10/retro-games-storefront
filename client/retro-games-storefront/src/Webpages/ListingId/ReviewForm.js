import { useEffect, useState } from "react"
import useAuth from "../../Components/Hooks/useAuth";
import {useHistory} from "react-router-dom";
import FormHelper from "../../Components/Forms/FormHelper";
import "./ReviewForm.css";

const EMPTY_REVIEW = {
    username : null,
    description: null,
    listing: null,
    rating: null,
    title: null
}

function ReviewForm({listingId, clickFix, startingReview = EMPTY_REVIEW}) {

    const [review, setReview] = useState(startingReview);
    const [error, setError] = useState([]);
    const history = useHistory();

    const auth = useAuth();

    const fillConstFields = function() {
        const newReview = {...review};
        newReview.username = auth.user.username;
        newReview.listing = listingId;
        newReview.author = null;
        setReview(newReview);
        
    }

    useEffect(() => fillConstFields, [])

    const changeHandler = (event) => {
        const newReview = { ...review };
        newReview[event.target.name] = event.target.value;
        setReview(newReview);
      };

    const addReview = function(evt) {
        evt.preventDefault();
        const init = {
            method: review.id ? "PUT": "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.user.token}`,
            },
            body: JSON.stringify(review),
          };
        fetch(`http://localhost:8080/api/review${review.id ? "/" + review.id :""}`, init)
        .then((res) => {
            if ([201,400].includes(res.status)) {
                return res.json();
            } else if (res.status === 204) {
                return null
            } else {
                return Promise.reject("Server Error")
            }
        })
        .then((res) => {
            if (res instanceof Array) {
            setError(res)
            } else {
            
            clickFix();
            history.push(`/listing/${review.listing}`)
            }
        })
        .catch(err => {
          if (err instanceof TypeError) {
            setError("Could not connect to api");
          } else {
            setError(err);
          }
        })
    };

    return (
    <form onSubmit={addReview}>

        <FormHelper
          inputType="text"
          identifier="title"
          labelText="Title:"
          newVal={review.title}
          onChangeHandler={changeHandler}
        />
                <FormHelper
          inputType="number"
          identifier="rating"
          labelText="Rating:"
          newVal={review.rating}
          onChangeHandler={changeHandler}
          min="0"
          step="1"
        />
        <FormHelper
          inputType="textarea"
          identifier="description"
          labelText="Description:"
          newVal={review.description}
          onChangeHandler={changeHandler}
        />
        <button id="submitReviewBtn" className="btn waves-effect waves-light">Submit<i id="reviewLogo" className="material-icons right">send</i></button>
    </form>
        )
}

export default ReviewForm