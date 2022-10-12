package learn.retrogames.domain;

import learn.retrogames.data.ListingRepository;
import learn.retrogames.models.Listing;
import learn.retrogames.models.ListingType;
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
    // - must have positive price
    // - must have positive (or 0) quantity
    // - must have listing type
    // - must have details object corresponding to listing type
    // - must NOT have any other details object
    // - must have an image path
    //

    private Result<Listing> validate (Listing listing) {
        Result<Listing> res = new Result<>();
        if (listing == null) {
            res.addMessage("Listing cannot be null.", ResultType.INVALID);
        }

        if (listing.getName() == null) {
            res.addMessage("Listing must have a name.", ResultType.INVALID);
        }

        if (listing.getPrice() == null || listing.getPrice().signum() < 0) {
            res.addMessage("Price must exist and be positive.", ResultType.INVALID);
        }

        if (listing.getQuantity() < 0 ) {
            res.addMessage("Quantity must be positive or 0.", ResultType.INVALID);
        }

        if (listing.getListingType() == null) {
            res.addMessage("Listing must have a listing type.", ResultType.INVALID);
        }

        switch (listing.getListingType()) {
            case GAME:
                if (listing.getGame() == null) {
                    res.addMessage("Game listings must have game details associated with them.", ResultType.INVALID);
                }
                if (listing.getConsole() != null || listing.getMerchandise() != null) {
                    res.addMessage("Game listings may not have console or merchandise details.", ResultType.INVALID);
                }
            case CONSOLE:
                if (listing.getConsole() == null) {
                    res.addMessage("Console listings must have console details associated with them.", ResultType.INVALID);
                }
                if (listing.getGame() != null || listing.getMerchandise() != null) {
                    res.addMessage("Console listings may not have game or merchandise details.", ResultType.INVALID);
                }
            case MERCHANDISE:
                if (listing.getMerchandise() == null) {
                    res.addMessage("Merchandise listings must have merchandise details associated with them.", ResultType.INVALID);
                }
                if (listing.getGame() != null || listing.getConsole() != null) {
                    res.addMessage("Merchandise listings may not have game or console details.", ResultType.INVALID);
                }
        }

        if (listing.getImagePath() == null) {
            res.addMessage("Listing must have an image path. For listings with no image use a placeholder.", ResultType.INVALID);
        }

        if (listing.getListingType() == ListingType.GAME && listing.getGame().getConsoles())

        return res;
    }
}
