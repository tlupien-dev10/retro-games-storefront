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

    private void existingListings() {
        List<Integer> el = new ArrayList<>();
        el.add(1);
        when(repo.getAvailableListingIds()).thenReturn(el);
    }

    @Test
    void shouldAdd() {
        Order toAdd = knownGoodOrder(false);
        existingListings();

        assertTrue(service.add(toAdd).isSuccess());
        assertEquals(ResultType.SUCCESS, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNull() {
        assertFalse(service.add(null).isSuccess());
        assertEquals(ResultType.INVALID, service.add(null).getType());
    }

    @Test
    void shouldNotAddWithId() {
        Order toAdd = knownGoodOrder(true);
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNullListings() {
        Order toAdd = knownGoodOrder(false);
        toAdd.setListings(null);
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddZeroListings() {
        Order toAdd = knownGoodOrder(false);
        toAdd.setListings(new ArrayList<>());
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNegativeOrderQuantity() {
        Order toAdd = knownGoodOrder(false);
        toAdd.getListings().get(0).setOrderedQuantity(-1);
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNullCustomer() {
        Order toAdd = knownGoodOrder(false);
        toAdd.setCustomer(null);
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddTooLarge() {
        Order toAdd = knownGoodOrder(false);
        toAdd.getListings().get(0).setOrderedQuantity(9001);
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNonexistentListing() {
        Order toAdd = knownGoodOrder(false);
        toAdd.getListings().get(0).setId(2);
        existingListings();

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldUpdate() {
        Order toUpdate = knownGoodOrder(true);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertTrue(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.SUCCESS, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNull() {
        assertFalse(service.update(null).isSuccess());
        assertEquals(ResultType.INVALID, service.update(null).getType());
    }

    @Test
    void shouldNotUpdateNullId() {
        Order toUpdate = knownGoodOrder(false);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(false);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateBadId() {
        Order toUpdate = knownGoodOrder(false);
        toUpdate.setId(2);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(false);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.NOT_FOUND, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNullListings() {
        Order toUpdate = knownGoodOrder(true);
        toUpdate.setListings(null);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateZeroListings() {
        Order toUpdate = knownGoodOrder(true);
        toUpdate.setListings(new ArrayList<>());
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNegativeOrderQuantity() {
        Order toUpdate = knownGoodOrder(true);
        toUpdate.getListings().get(0).setOrderedQuantity(-1);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNullCustomer() {
        Order toUpdate = knownGoodOrder(true);
        toUpdate.setCustomer(null);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateTooLarge() {
        Order toUpdate = knownGoodOrder(true);
        toUpdate.getListings().get(0).setOrderedQuantity(9001);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNonexistentListing() {
        Order toUpdate = knownGoodOrder(true);
        toUpdate.getListings().get(0).setId(2);
        existingListings();
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldDelete() {
        when(repo.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDelete() {
        when(repo.deleteById(9000)).thenReturn(false);
        assertFalse(service.deleteById(9000));
    }

}