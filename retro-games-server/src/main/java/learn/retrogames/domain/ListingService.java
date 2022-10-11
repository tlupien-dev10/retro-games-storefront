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

}
