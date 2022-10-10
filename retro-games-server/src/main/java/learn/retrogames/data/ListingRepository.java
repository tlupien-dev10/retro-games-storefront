package learn.retrogames.data;

import learn.retrogames.models.Listing;

import java.util.List;

public interface ListingRepository {
    public List<Listing> getAll();
}
