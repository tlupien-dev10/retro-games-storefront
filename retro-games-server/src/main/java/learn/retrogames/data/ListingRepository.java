package learn.retrogames.data;

import learn.retrogames.models.Listing;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ListingRepository {
    List<Listing> getAll();

    Listing getById(int id);

    @Transactional
    Listing add(Listing listing);

    @Transactional
    boolean update(Listing listing);

    @Transactional
    boolean deleteById(int id);
}
