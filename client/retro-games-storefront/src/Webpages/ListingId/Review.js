function Review({review}) {

    // needs an edit button only visible if author id = auth user id
    // needs delete button only visible for author id match + admin

    return (
        <>
        <p>{review.title}</p>
        <p>{review.rating}</p>
        <p>{review.author.username}</p>
        <p>{review.description}</p>
        </>
    )
}

export default Review;