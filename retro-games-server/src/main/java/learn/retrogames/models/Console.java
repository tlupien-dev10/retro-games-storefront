package learn.retrogames.models;

import java.time.LocalDate;

public class Console {
    private int id;
    private String version;
    private String company;
    private LocalDate releaseDate;

    public Console() {
    }

    public Console(int id, String version, String company, LocalDate releaseDate) {
        this.id = id;
        this.version = version;
        this.company = company;
        this.releaseDate = releaseDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }
}
