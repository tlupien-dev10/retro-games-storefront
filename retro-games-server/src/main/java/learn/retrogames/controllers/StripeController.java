package learn.retrogames.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import learn.retrogames.domain.StripeService;
import learn.retrogames.models.Listing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/payment")
public class StripeController {

    @Autowired
    StripeService service;

    @PostMapping
    public ResponseEntity getPrivateKey(@RequestBody List<Listing> cart) {
        try {
            PaymentIntent intent = service.buildPaymentIntent(cart);
            return ResponseEntity.ok(intent.getClientSecret());
        } catch(StripeException ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
