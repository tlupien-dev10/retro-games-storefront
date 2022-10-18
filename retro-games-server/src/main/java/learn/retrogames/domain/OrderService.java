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
        Result<Order> res = validate(order);

        if (!res.isSuccess()) {
            return res;
        }

        if (order.getId() != 0) {
            res.addMessage("Order id must not be set before adding.", ResultType.INVALID);
            return res;
        }

        order = repo.add(order);
        res.setPayload(order);
        return res;
    }

    public Result<Order> update(Order order) {
        Result<Order> res = validate(order);

        if (!res.isSuccess()) {
            return res;
        }

        if (order.getId() <= 0) {
            res.addMessage("Order id must be set before updating.", ResultType.INVALID);
            return res;
        }

        if (!repo.update(order)) {
            String msg = String.format("Order with id %s not found.", order.getId());
            res.addMessage(msg, ResultType.NOT_FOUND);
        }

        return res;
    }

    public boolean deleteById(int id) {
        return repo.deleteById(id);
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
            res.addMessage("Order cannot be null.", ResultType.INVALID);
            return res;
        }
        if (order.getCustomer()==null && order.getUsername()==null) {
            res.addMessage("Orders must be associated with a customer (user).", ResultType.INVALID);
        }
        if (order.getListings() == null || order.getListings().size() == 0) {
            res.addMessage("Orders must have products associated with them.", ResultType.INVALID);
        } else {

            if (order.getListings().stream().map(Listing::getOrderedQuantity).map(qty -> qty > 0).collect(Collectors.toList()).contains(false)) {
                res.addMessage("Orders cannot be for 0 of a product.", ResultType.INVALID);
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
                if (!repo.getAvailableListingIds().contains(l.getId())) {
                    res.addMessage("Order cannot reference listings that do not exist.", ResultType.INVALID);
                }
            }
        }
        return res;
    }
}
