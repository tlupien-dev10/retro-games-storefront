package learn.retrogames.data;

import learn.retrogames.models.Order;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface OrderRepository {
    public List<Order> getAll();

    public Order getById(int id);

    @Transactional
    public Order add(Order order);
}
