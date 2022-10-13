package learn.retrogames.domain;

import learn.retrogames.data.ConsoleRepository;
import learn.retrogames.data.ListingRepository;
import learn.retrogames.models.Console;
import learn.retrogames.models.Listing;
import learn.retrogames.models.ListingType;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListingService {
    private final ListingRepository repo;
    private final ConsoleRepository consoleRepo; // for game-console validation purposes; see validate method

    public ListingService(ListingRepository repo, ConsoleRepository consoleRepo) {
        this.repo = repo;
        this.consoleRepo = consoleRepo;
    }

    public List<Listing> getAll() {
        return repo.getAll();
    }

    public Listing getById(int id) {
        return repo.getById(id);
    }

    public Result<Listing> add (Listing listing) {
        Result<Listing> res = validate(listing);

        if (!res.isSuccess()) {
            return res;
        }

        if (listing.getId() != 0) {
            res.addMessage("Listing id must not be set before adding.", ResultType.INVALID);
            return res;
        }

        listing = repo.add(listing);
        res.setPayload(listing);
        return res;
    }

    public Result<Listing> update(Listing listing) {
        Result<Listing> res = validate(listing);

        if (!res.isSuccess()) {
            return res;
        }

        if (listing.getId() <= 0) {
            res.addMessage("Listing id must be set before updating.", ResultType.INVALID);
            return res;
        }

        if (!repo.update(listing)) {
            String msg = String.format("Listing with id %s not found.", listing.getId());
            res.addMessage(msg, ResultType.NOT_FOUND);
        }

        return res;
    }

    public boolean deleteById(int id) {
        return repo.deleteById(id);
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
            return res;
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
        } else {
            switch (listing.getListingType()) {
                case GAME:
                    if (listing.getGame() == null) {
                        res.addMessage("Game listings must have game details associated with them.", ResultType.INVALID);
                    } else if (listing.getGame().getConsoles().stream()
                            .map(Console::getId)
                            .map(id -> consoleRepo.getAvailableConsoleIds().contains(id))
                            .collect(Collectors.toList())
                            .contains(false)) {
                        res.addMessage("For game listings, all associated consoles must already exist.", ResultType.INVALID);
                    }
                    if (listing.getConsole() != null || listing.getMerchandise() != null) {
                        res.addMessage("Game listings may not have console or merchandise details.", ResultType.INVALID);
                    }
                    break;
                case CONSOLE:
                    if (listing.getConsole() == null) {
                        res.addMessage("Console listings must have console details associated with them.", ResultType.INVALID);
                    }
                    if (listing.getGame() != null || listing.getMerchandise() != null) {
                        res.addMessage("Console listings may not have game or merchandise details.", ResultType.INVALID);
                    }
                    break;
                case MERCHANDISE:
                    if (listing.getMerchandise() == null) {
                        res.addMessage("Merchandise listings must have merchandise details associated with them.", ResultType.INVALID);
                    }
                    if (listing.getGame() != null || listing.getConsole() != null) {
                        res.addMessage("Merchandise listings may not have game or console details.", ResultType.INVALID);
                    }
                    break;
            }
        }

        if (listing.getImagePath() == null) {
            res.addMessage("Listing must have an image path. For listings with no image use a placeholder.", ResultType.INVALID);
        }


        return res;
    }
}
