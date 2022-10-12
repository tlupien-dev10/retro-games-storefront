package learn.retrogames.controllers;


import learn.retrogames.domain.OrderService;
import learn.retrogames.domain.Result;
import learn.retrogames.models.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/order")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @GetMapping
    public List<Order> getAll() {
        return service.getAll();
    }

    @GetMapping("/{orderId}")
    public Order getById(@PathVariable int orderId) {
        return service.getById(orderId);
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<Object> add(@RequestBody Order order){
        Result<Order> result = service.add(order);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Object> update(@PathVariable int orderId, @RequestBody Order order){
        if (orderId != order.getId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Order> result = service.update(order);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }


    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteById(@PathVariable int orderId){
        if (service.deleteById(orderId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }





}
