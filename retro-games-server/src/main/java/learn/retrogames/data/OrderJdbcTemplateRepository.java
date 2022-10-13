package learn.retrogames.data;

import learn.retrogames.data.mappers.*;
import learn.retrogames.models.AppUser;
import learn.retrogames.models.Console;
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
import java.util.stream.Collectors;

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
        for (int i = 0; i < order.getListings().size(); i++) {
            addListingOrderRelationship(order, i);
        }
        return order;

    }

    @Override
    @Transactional
    public boolean update(Order order) {
        final String sql = "UPDATE order SET app_user_id = ? WHERE order_id = ?;";
        resetListingOrderRelationship(order.getId());
        for (int i = 0; i < order.getListings().size(); i++) {
            addListingOrderRelationship(order, i);
        }
        return (jdbcTemplate.update(sql,
                order.getCustomer().getAppUserId(),
                order.getId()) > 0);
    }

    @Override
    @Transactional
    public boolean deleteById(int id) {
        final String sql = "UPDATE order SET deleted = 1 WHERE order_id = ?;";
        softResetListingOrderRelationship(id);
        return (jdbcTemplate.update(sql, id) > 0);
    }

    @Override
    public List<Integer> getAvailableListingIds() {
        final String sql = "SELECT * FROM listing WHERE deleted = 0;";
        List<Listing> listings = jdbcTemplate.query(sql, new ListingMapper());
        return listings.stream().map(Listing::getId).collect(Collectors.toList());
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
        listings.forEach(l -> setListingOrderedQty(l, order.getId()));
        order.setListings(listings);
    }

    private void setListingOrderedQty(Listing listing, int orderId) {
        final String sql = "SELECT quantity FROM order_listing WHERE order_id = ? AND listing_id = ?;";
        int orderedQuantity = jdbcTemplate.query(sql,
                        (rs, row) -> rs.getInt("quantity"),
                        orderId,
                        listing.getId())
                .stream()
                .findFirst()
                .orElse(0);
        listing.setOrderedQuantity(orderedQuantity);
    }

    private void addListingOrderRelationship(Order order, int i) {
        final String sql = "INSERT INTO order_listing (order_id, listing_id, quantity) VALUES (?, ?, ?);";
        KeyHolder holder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, order.getId());
            ps.setInt(2, order.getListings().get(i).getId());
            ps.setInt(3, order.getListings().get(i).getId());
            return ps;
        }, holder);
    }
    private void resetListingOrderRelationship(int id) {
        final String sql = "DELETE FROM order_listing WHERE order_id = ?;";
        jdbcTemplate.update(sql, id);
    }

    private void softResetListingOrderRelationship(int id) {
        final String sql = "UPDATE order_listing SET deleted = 1 WHERE order_id = ?;";
        jdbcTemplate.update(sql, id);
    }
}
