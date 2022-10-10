package learn.retrogames.models;

public class Listing {

    private int id;
    private String name;
    private String description;
    private String image_path;
    private String listing_type;
    private int quantity;

    private Console console;
    private Game game;
    private Merchandise merchandise;

    public Listing() {
    }

    public Listing(int id, String name, String description, String image_path, String listing_type, int quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image_path = image_path;
        this.listing_type = listing_type;
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

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public String getListing_type() {
        return listing_type;
    }

    public void setListing_type(String listing_type) {
        this.listing_type = listing_type;
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
}
