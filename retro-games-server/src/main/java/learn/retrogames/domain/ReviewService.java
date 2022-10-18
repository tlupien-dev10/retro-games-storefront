package learn.retrogames.domain;

import learn.retrogames.data.ReviewRepository;
import learn.retrogames.models.Review;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    private final ReviewRepository repo;

    public ReviewService(ReviewRepository repo) {
        this.repo = repo;
    }

    public Result<Review> add(Review review) {
        Result<Review> res = validate(review);

        if (!res.isSuccess()) {
            return res;
        }

        if (review.getId() != 0) {
            res.addMessage("Review id must not be set before adding.", ResultType.INVALID);
            return res;
        }

        review = repo.add(review);
        res.setPayload(review);
        return res;
    }

    public Result<Review> update(Review review) {
        Result<Review> res = validate(review);

        if (!res.isSuccess()) {
            return res;
        }

        if (review.getId() <= 0) {
            res.addMessage("Review id must be set before updating.", ResultType.INVALID);
            return res;
        }

        if (!repo.update(review)) {
            String msg = String.format("Review with id %s not found.", review.getId());
            res.addMessage(msg, ResultType.NOT_FOUND);
        }

        return res;
    }

    public boolean deleteById(int id) {
        return repo.deleteById(id);
    }

    private Result<Review> validate (Review review) {
        Result<Review> res = new Result<>();
        if (review == null) {
            res.addMessage("Review cannot be null.", ResultType.INVALID);
            return res;
        }

        if (review.getTitle() == null) {
            res.addMessage("Review must have a title.", ResultType.INVALID);
        }

        if (review.getDescription() == null) {
            res.addMessage("Review must have content.", ResultType.INVALID);
        }

        if (review.getUsername() == null) {
            res.addMessage("Review must have an author.", ResultType.INVALID);
        }

        if (review.getRating() <= 0 || review.getRating() > 5) {
            res.addMessage("Ratings must be between 1 and 5 stars.", ResultType.INVALID);
        }

        if (review.getListing() <= 0) {
            res.addMessage("Reviews must be associated with a listing.", ResultType.INVALID);
        }

        return res;
    }
}
