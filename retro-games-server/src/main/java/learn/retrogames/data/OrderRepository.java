package learn.retrogames.data;

import learn.retrogames.models.Order;

import java.util.List;

public interface OrderRepository {
    public List<Order> getAll();
}
