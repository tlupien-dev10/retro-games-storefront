package learn.retrogames.data;

import learn.retrogames.data.mappers.ConsoleMapper;
import learn.retrogames.data.mappers.GameMapper;
import learn.retrogames.data.mappers.ListingMapper;
import learn.retrogames.data.mappers.MerchandiseMapper;
import learn.retrogames.models.Console;
import learn.retrogames.models.Game;
import learn.retrogames.models.Listing;
import learn.retrogames.models.Merchandise;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class ListingJdbcTemplateRepository implements ListingRepository {
    //TODO: add review-getting helper method here
    //TODO: modify RowMapper for game and console to each have the list of related console or game

    private final JdbcTemplate jdbcTemplate;

    public ListingJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Listing> getAll() {
        final String sql = "SELECT * FROM listing LIMIT 1000;";
        List<Listing> all =  jdbcTemplate.query(sql, new ListingMapper());
        all.forEach(this::getDetails);
        return all;
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
        final String sql = "SELECT * FROM console WHERE listing_id = ?";
        return jdbcTemplate.query(sql, new ConsoleMapper(), id).stream()
                .findFirst()
                .orElse(null);
    }

    private Game getGame(int id) {
        final String sql = "SELECT * FROM game WHERE listing_id = ?";
        return jdbcTemplate.query(sql, new GameMapper(), id).stream()
                .findFirst()
                .orElse(null);
    }

    private Merchandise getMerchandise(int id) {
        final String sql = "SELECT * FROM merchandise WHERE listing_id = ?";
        return jdbcTemplate.query(sql, new MerchandiseMapper(), id).stream()
                .findFirst()
                .orElse(null);
    }
}
