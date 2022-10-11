package learn.retrogames.data;

import learn.retrogames.data.mappers.AppUserMapper;
import learn.retrogames.data.mappers.ListingMapper;
import learn.retrogames.data.mappers.OrderMapper;
import learn.retrogames.models.AppUser;
import learn.retrogames.models.Listing;
import learn.retrogames.models.Order;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

public class OrderJdbcTemplateRepository  implements OrderRepository{

    private final JdbcTemplate jdbcTemplate;

    public OrderJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Order> getAll() {
        final String sql = "SELECT * FROM order;";
        List<Order> all = jdbcTemplate.query(sql, new OrderMapper());
        all.forEach(this::getCustomerForOrder);
        all.forEach(this::getListingsForOrder);
        return all;
    }

    private void getCustomerForOrder(Order order) {
        final String sql = "SELECT * FROM app_user WHERE app_user_id = ?;";
        AppUser customer = jdbcTemplate.query(sql, new AppUserMapper(new ArrayList<>()), order.getId()).stream()
                .findFirst()
                .orElse(null);
        order.setCustomer(customer);
    }

    private void getListingsForOrder(Order order) {
        final String sql = "SELECT * FROM listing AS l INNER JOIN order_listing AS ol ON l.listing_id = ol.listing_id " +
                "WHERE ol.order_id = ?;";
        List<Listing> listings = jdbcTemplate.query(sql, new ListingMapper(), order.getId());
        order.setListings(listings);
    }
}
