package learn.retrogames.data;

import learn.retrogames.data.mappers.AppUserMapper;
import learn.retrogames.data.mappers.AppUserMapperLite;
import learn.retrogames.data.mappers.ListingMapper;
import learn.retrogames.data.mappers.OrderMapper;
import learn.retrogames.models.AppUser;
import learn.retrogames.models.Listing;
import learn.retrogames.models.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderJdbcTemplateRepository  implements OrderRepository{

    private final JdbcTemplate jdbcTemplate;

    public OrderJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Order> getAll() {
        final String sql = "SELECT * FROM `order` WHERE deleted = 0;";
        List<Order> all = jdbcTemplate.query(sql, new OrderMapper());
        all.forEach(this::getCustomerForOrder);
        all.forEach(this::getListingsForOrder);
        return all;
    }

    @Override
    public Order getById(int id) {
        final String sql = "SELECT * FROM `order` WHERE order_id = ? AND deleted = 0;";
        Order order = jdbcTemplate.query(sql, new OrderMapper(), id).stream().findFirst().orElse(null);
        if (order != null) {
            getCustomerForOrder(order);
            getListingsForOrder(order);
        }
        return order;
    }

    @Override
    @Transactional
    public Order add(Order order) {
        final String sql = "INSERT INTO `order` (app_user_id) VALUES (?);";
        // add the order_listings to bridge table
        for (int i = 0; i < order.getListings().size(); i++) {
            addListingOrderRelationship(order, i);
        }

        KeyHolder holder = new GeneratedKeyHolder();
        int nRowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, order.getCustomer().getAppUserId());
            return ps;
        }, holder);

        if (nRowsAffected <= 0) {
            return null;
        }

        order.setId(holder.getKey().intValue());
        return order;

    }

    @Override
    @Transactional
    public boolean update(Order order) {
        final String sql = "UPDATE order SET app_use_id = ? WHERE order_id = ?;";
        resetListingOrderRelationship(order.getId());
        for (int i = 0; i < order.getListings().size(); i++) {
            addListingOrderRelationship(order, i);
        }
        return (jdbcTemplate.update(sql,
                order.getCustomer().getAppUserId(),
                order.getId()) > 0);
    }


    private void getCustomerForOrder(Order order) {
        final String sql = "SELECT * FROM app_user WHERE app_user_id = ?;";
        AppUser customer = jdbcTemplate.query(sql, new AppUserMapperLite(), order.getCustomer()).stream()
                .findFirst()
                .orElse(null);
        order.setCustomer(customer);
    }

    private void getListingsForOrder(Order order) { // order model intentionally has dehydrated listings.
        final String sql = "SELECT * FROM listing AS l INNER JOIN order_listing AS ol ON l.listing_id = ol.listing_id " +
                "WHERE ol.order_id = ?;";
        List<Listing> listings = jdbcTemplate.query(sql, new ListingMapper(), order.getId());
        order.setListings(listings);
    }

    private void addListingOrderRelationship(Order order, int i) {
        final String sql = "INSERT INTO order_listing (order_id, listing_id) VALUES (?, ?);";
        KeyHolder holder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, order.getId());
            ps.setInt(2, order.getListings().get(i).getId());
            return ps;
        }, holder);
    }
    private void resetListingOrderRelationship(int id) {
        final String sql = "DELETE FROM order_listing WHERE order_id = ?;";
        jdbcTemplate.update(sql, id);
    }
}
