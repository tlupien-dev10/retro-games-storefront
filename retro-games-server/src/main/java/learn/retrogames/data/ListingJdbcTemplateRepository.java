package learn.retrogames.data;

import learn.retrogames.data.mappers.*;
import learn.retrogames.models.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ListingJdbcTemplateRepository implements ListingRepository {
    private final JdbcTemplate jdbcTemplate;

    public ListingJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Listing> getAll() {
        final String sql = "SELECT * FROM listing LIMIT 1000;";
        List<Listing> all =  jdbcTemplate.query(sql, new ListingMapper());
        all.forEach(this::getDetails);
        all.forEach(this::getReviews);
        return all;
    }

    @Override
    public Listing getById(int id) {
        final String sql = "SELECT * FROM listing WHERE listing_id = ?;";
        Listing listing = jdbcTemplate.query(sql, new ListingMapper(), id).stream()
                .findFirst()
                .orElse(null);
        if (listing != null) {
            getDetails(listing);
            getReviews(listing);
        }
        return listing;
    }

    @Override
    public Listing add(Listing listing) {
        final String sql = "INSERT INTO listing (listing_name, listing_description, image_path, listing_type, quantity, price)" +
                " VALUES(?,?,?,?,?,?);";
        KeyHolder holder = new GeneratedKeyHolder();
        int nRowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, listing.getName());
            ps.setString(2, listing.getDescription());
            ps.setString(3,listing.getImagePath());
            ps.setString(4, listing.getListingType().toString());
            ps.setInt(5, listing.getQuantity());
            ps.setBigDecimal(6, listing.getPrice());
            return ps;
        }, holder);

        if (nRowsAffected <= 0) {
            return null;
        }

        //TODO: also insert stuff into the details table


        listing.setId(holder.getKey().intValue());
        return listing;
    }

    @Override
    public boolean update(Listing listing) {
        final String sql ="UPDATE listing SET" +
                " listing_name = ?," +
                " listing_description = ?," +
                " image_path = ?," +
                " listing_type = ?," +
                " quantity = ?," +
                " price = ?;";

        //TODO: update details table as well (?)


        return (jdbcTemplate.update(sql,
                listing.getName(),
                listing.getDescription(),
                listing.getImagePath(),
                listing.getListingType().toString(),
                listing.getQuantity(),
                listing.getPrice()) > 0); // returns true if it affected a row
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        // delete details and then listing
        // TODO: helper methods to delete detail table records go here
        // NOTE THIS WILL NOT WORK UNTIL HELPER METHODS ARE ADDED ABOVE
        final String sql = "DELETE * FROM listing WHERE listing_id = ?;";
        return (jdbcTemplate.update(sql,id) > 0);
    }

    private void getDetails(Listing listing) {
        switch (listing.getListingType()) {
            case GAME:
                listing.setGame(getGame(listing.getId()));
                break;
            case CONSOLE:
                listing.setConsole(getConsole(listing.getId()));
                break;
            case MERCHANDISE:
                listing.setMerchandise(getMerchandise(listing.getId()));
                break;
        }
    }

    private Console getConsole(int id) {
        final String sql = "SELECT * FROM console WHERE listing_id = ?;";
        return jdbcTemplate.query(sql, new ConsoleMapper(), id).stream()
                .findFirst()
                .orElse(null);
    }

    private Game getGame(int id) {
        final String sql = "SELECT * FROM game WHERE listing_id = ?;";
        Game game =  jdbcTemplate.query(sql, new GameMapper(), id).stream()
                .findFirst()
                .orElse(null);
        getConsolesForGame(game);
        return game;
    }

    private void getConsolesForGame(Game game) {
        final String sql = "SELECT * FROM console AS c INNER JOIN game_console AS gc ON c.console_id = gc.console_id "
                + "WHERE gc.game_id = ?;";
        if (game != null) {
            game.setConsoles(jdbcTemplate.query(sql, new ConsoleMapper(), game.getId()));
        }
    }

    private Merchandise getMerchandise(int id) {
        final String sql = "SELECT * FROM merchandise WHERE listing_id = ?;";
        return jdbcTemplate.query(sql, new MerchandiseMapper(), id).stream()
                .findFirst()
                .orElse(null);
    }

    private void getReviews(Listing listing) {
        int id = listing.getId();
        final String sql = "SELECT * FROM review WHERE listing_id = ?;";
        List<Review> reviews =  jdbcTemplate.query(sql, new ReviewMapper(), id);
        reviews.forEach(this::getAuthorsForReviews);
        listing.setReviews(reviews);
    }

    private void getAuthorsForReviews(Review review) {
        final String sql = "SELECT * FROM app_user WHERE app_user_id = ?;";
        // This *should* pull in the user but without any role information because of the empty list passed to the
        // Mapper. Testing will be needed.
        AppUser author = jdbcTemplate.query(sql, new AppUserMapper(new ArrayList<String>()), review.getId()).stream()
                .findFirst()
                .orElse(null);
        review.setAuthor(author);
    }
}
