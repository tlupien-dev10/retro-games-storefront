package learn.retrogames.data;

import learn.retrogames.models.Order;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class OrderJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 5;

    @Autowired
    OrderJdbcTemplateRepository orderJdbcTemplateRepository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp(){
        knownGoodState.set();
    }

    @Test
    void shouldFindAll(){
        List<Order> orders = orderJdbcTemplateRepository.getAll();
        assertNotNull(orders);
        assertEquals(4, orders.size());

        assertEquals(orders.get(0).getListings().get(0).getQuantity(), 14);
        assertEquals(orders.get(0).getListings().get(0).getOrderedQuantity(), 2);
    }
}
