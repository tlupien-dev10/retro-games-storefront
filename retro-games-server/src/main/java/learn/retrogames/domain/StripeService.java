package learn.retrogames.domain;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import learn.retrogames.models.Listing;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {
    private final String apiKey = "sk_test_51Lsu0RK0z3kkSqwss16FUTwru23EvEHUAZN2tzFf7olF7H4aKtMv7nuPI3kSwXcDKLQ54uGefh85UnbWENkoUffg00OJW0b68y";

    public StripeService() {
        Stripe.apiKey=apiKey;
    }

    public PaymentIntent buildPaymentIntent(List<Listing> listings) throws StripeException {
        // describes total charge, currency, allowed pmt types, etc.
        // use a map
        Map<String, Object> params = new HashMap<>();
        params.put("currency","usd");
        params.put("amount",calculatePennies(listings)); // make this function

        List<String> card = new ArrayList<>();
        card.add("card");
        params.put("payment_method_types",card);

        return PaymentIntent.create(params);
    }

    private int calculatePennies(List<Listing> listings) {
        return listings.stream()
                .map(l -> l.getPrice().multiply(BigDecimal.valueOf(100)).multiply(BigDecimal.valueOf(l.getOrderedQuantity())))
                .map(BigDecimal::intValue)
                .reduce(Integer::sum)
                .orElse(0);
    }
}
