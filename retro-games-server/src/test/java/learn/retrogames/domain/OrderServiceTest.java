package learn.retrogames.domain;

import learn.retrogames.data.OrderRepository;
import learn.retrogames.models.AppUser;
import learn.retrogames.models.Listing;
import learn.retrogames.models.ListingType;
import learn.retrogames.models.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class OrderServiceTest {

    @Autowired
    OrderService service;

    @MockBean
    OrderRepository repo;

    // Tests for add and update are pretty much the validation note from order service:
    // - the usual add has NO id / update HAS id
    // - an order has at least one listing associated with it
    // - all orderedQuantities associated with listings are positive
    // - order must have a customer (user) associated with it
    // - orderedQuantities cannot exceed regular (inventory) quantities
    // - order can't be null
    // - all listings associated with an order must already exist

    private Order knownGoodOrder(boolean id) {
        Order order = new Order();

        List<Listing> listings = new ArrayList<>();
        Listing listing = new Listing();
        listing.setId(1);
        listing.setName("Test");
        listing.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
        listing.setImagePath("/test/image/path.png");
        listing.setListingType(ListingType.CONSOLE);
        listing.setQuantity(69);
        listing.setOrderedQuantity(2);
        listing.setPrice(new BigDecimal("39.99"));
        listings.add(listing);
        order.setListings(listings);

        AppUser customer = new AppUser(1, "test@customer.com");
        order.setCustomer(customer);

        if (id) {
            order.setId(1);
        }

        return order;
    }

    @Test
    void shouldAdd() {
        Order toAdd = knownGoodOrder(false);

        List<Integer> el = new ArrayList<>();
        el.add(1);
        when(repo.getAvailableListingIds()).thenReturn(el);

        service.add(toAdd).getMessages().forEach(System.out::println);
        assertTrue(service.add(toAdd).isSuccess());
        assertEquals(ResultType.SUCCESS, service.add(toAdd).getType());
    }
}