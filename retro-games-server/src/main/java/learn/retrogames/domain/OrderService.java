package learn.retrogames.domain;

import learn.retrogames.models.Order;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {


    public List<Order> getAll() {
        throw new UnsupportedOperationException();
    }

    public Order getById(int orderId) {
        throw new UnsupportedOperationException();
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
