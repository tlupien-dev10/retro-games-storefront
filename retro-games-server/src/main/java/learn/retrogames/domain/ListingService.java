package learn.retrogames.domain;

import learn.retrogames.data.ListingRepository;
import learn.retrogames.models.Listing;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListingService {
    private final ListingRepository repo;

    public ListingService(ListingRepository repo) {
        this.repo = repo;
    }

    public List<Listing> getAll() {
        return repo.getAll();
    }

    public Listing getById(int id) {
        return repo.getById(id);
    }

    // Validation:
    // - adding listing of type Game: consoles game is on (which are in the list attached to game) must all exist
    // - must have name
    // -
    // - must have price

}
