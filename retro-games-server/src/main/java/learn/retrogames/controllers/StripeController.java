package learn.retrogames.controllers;

import learn.retrogames.models.Listing;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/payment")
public class StripeController {
    @PostMapping
    public String getPrivateKey(@RequestBody List<Listing> cart) {
        return null;
    }
}
