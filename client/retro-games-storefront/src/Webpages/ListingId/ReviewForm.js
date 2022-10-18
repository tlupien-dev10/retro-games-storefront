import { useEffect, useState } from "react"
import useAuth from "../../Components/Hooks/useAuth";

const EMPTY_REVIEW = {
    username : null,
    description: null,
    listing: null,
    rating: null,
    title: null
}

function ReviewForm({listingId, startingReview = EMPTY_REVIEW}) {

    const [review, setReview] = useState(startingReview);

    const auth = useAuth();

    const fillConstFields = function() {
        const newReview = {...review};
        newReview.username = auth.user.username;
        newReview.listing = listingId;
        setReview(newReview);
        console.log(newReview);
    }

    useEffect(() => fillConstFields, [])


    return <p>Placeholder Text</p>
}

export default ReviewForm