package learn.retrogames.data;

import learn.retrogames.models.Order;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository {
    List<Order> getAll();

    Order getById(int id);

    @Transactional
    Order add(Order order);

    @Transactional
    boolean update(Order order);

    @Transactional
    boolean deleteById(int id);

    List<Integer> getAvailableListingIds();
}
