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

    private final JdbcTemplate jdbcTemplate;

    public ListingJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Listing> getAll() {
        final String sql = "SELECT * FROM listing LIMIT 1000;";
        List<Listing> all =  jdbcTemplate.query(sql, new ListingMapper());
        return null;
    }

    private void getDetails(int id) {
        //TODO: put a switch here that calls one of the helper methods to hydrate listing
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
