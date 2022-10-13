package learn.retrogames.domain;

import learn.retrogames.data.OrderRepository;
import learn.retrogames.models.Listing;
import learn.retrogames.models.Order;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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


    // Validation:
    // - the usual add has NO id / update HAS id
    // - an order has at least one listing associated with it
    // - all orderedQuantities associated with listings are positive
    // - order must have a customer (user) associated with it
    // - orderedQuantities cannot exceed regular (inventory) quantities
    // - order can't be null
    // - all listings associated with an order must already exist

    private Result<Order> validate(Order order) {
        Result<Order> res = new Result<>();
        if (order == null) {
            res.addMessage("Listing cannot be null.", ResultType.INVALID);
            return res;
        }
        if (order.getCustomer()==null) {
            res.addMessage("Orders must be associated with a customer (user).", ResultType.INVALID);
        }
        if (order.getListings() == null || order.getListings().size() == 0) {
            res.addMessage("Orders must have products associated with them.", ResultType.INVALID);
        } else if (order.getListings().stream().map(Listing::getOrderedQuantity).map(qty -> qty > 0).collect(Collectors.toList()).contains(false)) {
            res.addMessage("You may not order 0 of a product.", ResultType.INVALID);
        }

        List<Listing> listings = order.getListings();
        for (Listing l : listings) {
            if (l.getOrderedQuantity() > l.getQuantity()) {
                res.addMessage(
                        String.format("There are only %s %s in stock. Orders for an item cannot exceed what is in stock.",
                                l.getQuantity(),
                                l.getName()),
                        ResultType.INVALID);
            }
        }
        return res;
    }
}
