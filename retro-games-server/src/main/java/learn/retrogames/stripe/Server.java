package learn.retrogames.stripe;
import java.nio.file.Paths;


import static spark.Spark.post;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;


public class Server {
    public static void main(String[] args) {
        port(4242);

        Stripe.apiKey = "sk_test_51Lsu0RK0z3kkSqwss16FUTwru23EvEHUAZN2tzFf7olF7H4aKtMv7nuPI3kSwXcDKLQ54uGefh85UnbWENkoUffg00OJW0b68y";

        post("/create-checkout-session", (request, response) -> {
            String YOUR_DOMAIN = "http://localhost:8080/api/";
            SessionCreateParams params =
                    SessionCreateParams.builder()
                            .setMode(SessionCreateParams.Mode.PAYMENT)
                            .setSuccessUrl(YOUR_DOMAIN)
                            .setCancelUrl(YOUR_DOMAIN + "listing")
                            .addLineItem(
                                    SessionCreateParams.LineItem.builder()
                                            .setQuantity(1L)
                                            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                                            .setPrice("{{PRICE_ID}}")
                                            .build())
                            .build();

            Session session = Session.create(params);

            response.redirect(session.getUrl(), 303);
            return "";
        });
    }
}
