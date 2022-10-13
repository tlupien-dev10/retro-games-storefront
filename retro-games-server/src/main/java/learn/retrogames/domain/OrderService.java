package learn.retrogames.domain;

import learn.retrogames.data.OrderRepository;
import learn.retrogames.models.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public List<Order> getAll() {
        return repo.getAll();
    }

    public Order getById(int id) {
        return repo.getById(id);
    }

    public Result<Order> add(Order order) {
        throw new UnsupportedOperationException();
    }

    public Result<Order> update(Order order) {
        throw new UnsupportedOperationException();
    }

    public boolean deleteById(int orderId) {
        throw new UnsupportedOperationException();
    }
}
