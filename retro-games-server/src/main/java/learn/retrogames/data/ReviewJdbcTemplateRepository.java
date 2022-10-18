package learn.retrogames.data;

import learn.retrogames.data.mappers.AppUserMapperLite;
import learn.retrogames.data.mappers.ReviewRepository;
import learn.retrogames.models.AppUser;
import learn.retrogames.models.Review;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class ReviewJdbcTemplateRepository implements ReviewRepository {
    private final JdbcTemplate jdbcTemplate;

    public ReviewJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Review add(Review review) {
        final String sql = "INSERT INTO review (review_title, review_author, review_description, listing_id, rating)" +
                "VALUES (?,?,?,?,?);";
        KeyHolder holder = new GeneratedKeyHolder();
        int nRowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1,review.getTitle());
            ps.setInt(2,review.getAuthorId());
            ps.setString(3,review.getDescription());
            ps.setInt(4,review.getListing());
            ps.setInt(5,review.getRating());
            return ps;
        }, holder);
        if (nRowsAffected <= 0) {
            return null;
        }
        review.setId(holder.getKey().intValue());
        return review;
    }

    @Override
    public boolean update(Review review) {
        final String sql = "UPDATE review SET" +
                " review_title = ?, " +
                " review_author  = ?," +
                " review_description = ?," +
                " listing_id = ?," +
                " rating = ?" +
                " WHERE review_id = ?;";
        return (jdbcTemplate.update(sql,
                review.getTitle(),
                review.getAuthorId(),
                review.getDescription(),
                review.getListing(),
                review.getRating(),
                review.getId()) > 0);
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        final String sql = "UPDATE review SET deleted = 1 WHERE review_id = ?;";
        return (jdbcTemplate.update(sql, id) > 0);
    }
}
