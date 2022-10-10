package learn.retrogames.models;

import java.time.LocalDate;

public class Game {
    private int id;
    private String genre;
    private String publisher;
    private LocalDate releaseDate;

    public Game() {
    }

    public Game(int id, String genre, String publisher, LocalDate releaseDate) {
        this.id = id;
        this.genre = genre;
        this.publisher = publisher;
        this.releaseDate = releaseDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }
}
