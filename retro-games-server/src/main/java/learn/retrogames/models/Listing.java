package learn.retrogames.models;

import java.math.BigDecimal;
import java.util.List;

public class Listing {

    //TODO: add reviews as a thing that can be hydrated here
    private int id;
    private String name;
    private String description;
    private String imagePath;
    private ListingType listingType;
    private int quantity;

    private Console console;
    private Game game;
    private Merchandise merchandise;

    private List<Review> reviews;
    private BigDecimal price;

    public Listing() {
    }

    public Listing(int id, String name, String description, String imagePath, ListingType listingType, int quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.listingType = listingType;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public ListingType getListingType() {
        return listingType;
    }

    public void setListingType(ListingType listingType) {
        this.listingType = listingType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Console getConsole() {
        return console;
    }

    public void setConsole(Console console) {
        this.console = console;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Merchandise getMerchandise() {
        return merchandise;
    }

    public void setMerchandise(Merchandise merchandise) {
        this.merchandise = merchandise;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
