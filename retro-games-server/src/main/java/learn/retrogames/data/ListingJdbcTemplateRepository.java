package learn.retrogames.data;

import learn.retrogames.data.mappers.*;
import learn.retrogames.models.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

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
        return null;
    }

    @Override
    public boolean update(Listing listing) {
        return false;
    }

    @Override
    public boolean deleteById(int id) {
        return false;
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
        game.setConsoles(jdbcTemplate.query(sql, new ConsoleMapper(), game.getId()));
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
