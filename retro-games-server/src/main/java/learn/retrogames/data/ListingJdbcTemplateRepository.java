package learn.retrogames.data;

import learn.retrogames.data.mappers.*;
import learn.retrogames.models.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.sql.Date;
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

        listing.setId(holder.getKey().intValue());
        addDetails(listing);
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
                " price = ?" +
                " WHERE listing_id = ?;";

         boolean listingUpdated =  (jdbcTemplate.update(sql,
                listing.getName(),
                listing.getDescription(),
                listing.getImagePath(),
                listing.getListingType().toString(),
                listing.getQuantity(),
                listing.getPrice(),
                listing.getId()) > 0);

        if (listingUpdated) {
            updateDetails(listing);
        }

        return listingUpdated;
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        Listing toDelete = getById(id);
        deleteDetails(toDelete);
        final String sql = "DELETE * FROM listing WHERE listing_id = ?;";
        return (jdbcTemplate.update(sql,id) > 0);
    }

    // -------------------------------
    // Read details helper methods
    // -------------------------------

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
        //TODO make it remove some of the user's fields (like pass hash)
        final String sql = "SELECT * FROM app_user WHERE app_user_id = ?;";
        // This *should* pull in the user but without any role information because of the empty list passed to the
        // Mapper. Testing will be needed.
        AppUser author = jdbcTemplate.query(sql, new AppUserMapper(new ArrayList<String>()), review.getId()).stream()
                .findFirst()
                .orElse(null);
        review.setAuthor(author);
    }

    private void addDetails(Listing listing) {
        switch (listing.getListingType()) {
            case GAME:
                addGame(listing.getGame(), listing.getId());
                break;
            case CONSOLE:
                addConsole(listing.getConsole(), listing.getId());
                break;
            case MERCHANDISE:
                addMerchandise(listing.getMerchandise(), listing.getId());
                break;
        }
    }

    // -----------------------------
    // Add details helper methods
    // -----------------------------

    private void addGame(Game game, int listingId) {
        final String sql = "INSERT INTO game (genre, publisher, release_date, listing_id) " +
                "VALUES (?, ?, ?, ?);";

        KeyHolder holder = new GeneratedKeyHolder();
        int nRowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, game.getGenre());
            ps.setString(2, game.getPublisher());
            ps.setDate(3, game.getReleaseDate() == null ? null : Date.valueOf(game.getReleaseDate()));
            ps.setInt(4, listingId);
            return ps;
        }, holder);

        game.setId(holder.getKey().intValue());
        for (int i = 0; i < game.getConsoles().size(); i++) {
            addGameConsoleRelationship(game, i);
        }
    }

    private void addGameConsoleRelationship(Game game, int i) {
        // game must have id by the time this gets called
        // also this should only really be called in the addGame method
            final String sql = "INSERT INTO game_console (game_id, console_id) VALUES (?,?);";
            KeyHolder holder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setInt(1, game.getId());
                ps.setInt(1,game.getConsoles().get(i).getId());
                return ps;
            }, holder);
    }

    private void addConsole(Console console, int listingId) {
        final String sql = "INSERT INTO console (console_version, company, console_release_date, listing_id) " +
                "VALUES (?, ?, ?, ?);";

        KeyHolder holder = new GeneratedKeyHolder();
        int nRowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, console.getVersion());
            ps.setString(2, console.getCompany());
            ps.setDate(3, console.getReleaseDate() == null ? null : Date.valueOf(console.getReleaseDate()));
            ps.setInt(4, listingId);
            return ps;
        }, holder);
    }

    private void addMerchandise(Merchandise merch, int listingId) {
        final String sql = "INSERT INTO merchandise (category, listing_id) " +
                "VALUES (?,?);";
        KeyHolder holder = new GeneratedKeyHolder();
        int nRowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, merch.getCategory());
            ps.setInt(2, listingId);
            return ps;
        }, holder);
    }

    // ------------------------------
    // Update details helper methods
    // ------------------------------

    private void updateDetails(Listing listing) {
        switch (listing.getListingType()) {
            case GAME:
                updateGame(listing.getGame(), listing.getId());
                break;
            case CONSOLE:
                updateConsole(listing.getConsole(), listing.getId());
                break;
            case MERCHANDISE:
                updateMerchandise(listing.getMerchandise(), listing.getId());
                break;
        }
    }

    private void updateGame(Game game, int listingId) {
        final String sql = "UPDATE game SET" +
                " genre = ?," +
                " publisher = ?," +
                " release_date = ?," +
                " listing_id = ?" +
                " WHERE game_id = ?;";
        jdbcTemplate.update(sql,
                game.getGenre(),
                game.getPublisher(),
                game.getReleaseDate(),
                listingId,
                game.getId());

        // since update wouldn't be great here, reset and add the consoles again
        resetGameConsoleRelationships(game.getId());
        for (int i = 0; i < game.getConsoles().size(); i++) {
            addGameConsoleRelationship(game, i);
        }
    }

    private void resetGameConsoleRelationships(int id) {
        final String sql = "DELETE * FROM game_console WHERE game_id = ?";
        jdbcTemplate.update(sql,id);
    }

    private void updateConsole(Console console, int listingId) {
        final String sql = "UPDATE console SET" +
                " version = ?," +
                " company = ?," +
                " console_release_date = ?," +
                " listing_id = ?" +
                " WHERE console_id = ?;";
        jdbcTemplate.update(sql,
                console.getVersion(),
                console.getCompany(),
                console.getReleaseDate(),
                listingId,
                console.getId());
    }

    private void updateMerchandise(Merchandise merch, int listingId) {
        final String sql = "UPDATE merchandise SET" +
                " merchandise_category = ?," +
                " listing_id = ?" +
                " WHERE merchandise_id = ?;";
        jdbcTemplate.update(sql,
                merch.getCategory(),
                listingId,
                merch.getId());
    }

    // -----------------------------
    // Delete details order method
    // -----------------------------

    private void deleteDetails(Listing listing) {
        switch (listing.getListingType()) {
            case GAME:
                deleteGameById(listing.getGame().getId());
                break;
            case CONSOLE:
                deleteConsoleById(listing.getConsole().getId());
                break;
            case MERCHANDISE:
                deleteMerchandiseById(listing.getMerchandise().getId());
                break;
        }

    }

    private void deleteGameById(int id) {
        final String sql = "DELETE * FROM game WHERE game_id = ?;";
        jdbcTemplate.update(sql,id);
        resetGameConsoleRelationships(id);
    }

    private void deleteConsoleById(int id) {
        final String sql = "DELETE * FROM console WHERE console_id = ?;";
        jdbcTemplate.update(sql,id);
    }

    private void deleteMerchandiseById(int id) {
        final String sql = "DELETE * FROM merchandise WHERE merchandise_id = ?;";
        jdbcTemplate.update(sql,id);
    }
}
