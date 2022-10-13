package learn.retrogames.data;

import learn.retrogames.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class OrderJdbcTemplateRepositoryTest {


    @Autowired
    OrderJdbcTemplateRepository orderJdbcTemplateRepository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp(){
        knownGoodState.set();
    }

    private Order makeOrder(){
        Order order = new Order();
        Listing toPopulate = new Listing();
        toPopulate.setName("Super Mario Sunshine");
        toPopulate.setPrice(new BigDecimal(69.99f));
        toPopulate.setDescription("Explore Isle Delfino as Mario with F.L.U.D.D. to stop Shadow Mario and Rescue Princess Peach");
        toPopulate.setListingType(ListingType.GAME);
        toPopulate.setQuantity(14);
        toPopulate.setImagePath("./ImageTest/1.jpg");
        toPopulate.setOrderedQuantity(1);
        toPopulate.setId(1);

        List<Listing> orderListings = new ArrayList<>();
        orderListings.add(toPopulate);
        order.setListings(orderListings);
        List<String> roles = new ArrayList<>();
        roles.add("ADMIN");
        AppUser customer = new AppUser(3, "tyler@bencs.com", "$2a$10$ntB7CsRKQzuLoKY3rfoAQen5nNyiC/U60wBsWnnYrtQQi8Z3IZzQa", true, roles);
        order.setCustomer(customer);
        return order;
    }

    @Test
    void shouldFindAll(){
        List<Order> orders = orderJdbcTemplateRepository.getAll();
        assertNotNull(orders);
        assertEquals(4, orders.size());

        assertEquals(14, orders.get(0).getListings().get(0).getQuantity());
        assertEquals(2, orders.get(0).getListings().get(0).getOrderedQuantity());

        assertEquals(ListingType.MERCHANDISE, orders.get(1).getListings().get(0).getListingType());
        assertEquals(1, orders.get(0).getId());
    }

    @Test
    void shouldFindById(){
        Order order = orderJdbcTemplateRepository.getById(1);
        assertNotNull(order);
        assertEquals(6, order.getListings().get(0).getId());
        assertEquals(12, order.getListings().get(1).getId());
        assertEquals(2, order.getListings().size());
    }

    @Test
    void shouldAddOrder(){
        Order order = makeOrder();
        Order actual = orderJdbcTemplateRepository.add(order);
        assertNotNull(actual);
        assertEquals(5, actual.getId());
    }

    @Test
    void shouldUpdateOrder(){
        Order toUpdate = orderJdbcTemplateRepository.getById(2);
        toUpdate.getListings().get(0).setOrderedQuantity(4);
        assertTrue(orderJdbcTemplateRepository.update(toUpdate));
        Integer orderedQuantity = orderJdbcTemplateRepository.getById(2).getListings().get(0).getOrderedQuantity();
        assertEquals(4, orderedQuantity);

    }

    @Test
    void shouldDelete(){
        assertTrue(orderJdbcTemplateRepository.deleteById(1));
    }

    @Test
    void shouldGetAvailableListingIds(){
        List<Integer> expected = new ArrayList<>();
        for (int i = 1; i <= 13; i++){
            expected.add(i);
        }
        assertEquals(expected, orderJdbcTemplateRepository.getAvailableListingIds());
    }


}
