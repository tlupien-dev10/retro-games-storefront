package learn.retrogames.data.mappers;

import learn.retrogames.models.Review;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ReviewMapper2 implements RowMapper<Review> {
    @Override
    public Review mapRow(ResultSet resultSet, int i) throws SQLException {
        Review review = new Review();
        review.setId(resultSet.getInt("review_id"));
        review.setTitle(resultSet.getString("review_title"));
        review.setDescription(resultSet.getString("review_description"));
        review.setListing(resultSet.getInt("listing_id"));
        review.setRating(resultSet.getInt("rating"));
        review.setAuthorId(resultSet.getInt("app_user_id"));
        return review;
    }
}