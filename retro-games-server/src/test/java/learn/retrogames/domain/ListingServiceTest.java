package learn.retrogames.domain;

import learn.retrogames.data.ConsoleRepository;
import learn.retrogames.data.ListingRepository;
import learn.retrogames.models.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class ListingServiceTest {
    @Autowired
    ListingService service;

    @MockBean
    ListingRepository repo;

    @MockBean
    ConsoleRepository consoleRepo;

    // What do I want to test?
    // - getAll passthrough
    // - getById passthrough
    // - add validations
    //      - success case for all 3 types
    //      - fail for null
    //      - fail for no name
    //      - fail for no price
    //      - fail for negative price
    //      - fail for negative quantity
    //      - fail for no listing type
    //      - fail for no details object
    //      - fail for wrong details object
    //      - fail for multiple details objects
    //      - fail for no image path
    //      - fail for game details with nonexistent consoles
    //      - fail for having an id (ADD specific)
    // - update - all validations from add except it has to ALREADY have an id, rather than not having one
    // - delete - success case for all 3 types + 1 fail for not found (when repo returns false)
    // - well, the difference between deletion for the 3 types is in the repo, so that's where that should be tested.

    private Listing knownGoodListing(ListingType type) {
        // generic listing info

        Listing listing = new Listing();
        listing.setName("Test");
        listing.setDescription("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
        listing.setImagePath("/test/image/path.png");
        listing.setListingType(type);
        listing.setQuantity(69);
        listing.setPrice(new BigDecimal(39.99));


        // details objects (only adds 1)
        Console console = new Console(1,"Test","ACME consoles",LocalDate.of(2022,10,12));

        Game game = new Game(1,"Test","ACME games", LocalDate.of(2022,10,12));
        List<Console> consoles = new ArrayList<>();
        consoles.add(console);
        game.setConsoles(consoles);

        Merchandise merch = new Merchandise(1, "Test");

        switch (type) {
            case GAME:
                listing.setGame(game);
                break;
            case CONSOLE:
                listing.setConsole(console);
                break;
            case MERCHANDISE:
                listing.setMerchandise(merch);
                break;
        }

        return listing;
    }

    @Test
    void shouldAddGame() {
        Listing toAdd = knownGoodListing(ListingType.GAME);

        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertTrue(service.add(toAdd).isSuccess());
        assertEquals(ResultType.SUCCESS, service.add(toAdd).getType());
    }

    @Test
    void shouldAddConsole() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);

        service.add(toAdd).getMessages().forEach(System.out::println);

        assertTrue(service.add(toAdd).isSuccess());
        assertEquals(ResultType.SUCCESS, service.add(toAdd).getType());
    }

    @Test
    void shouldAddMerch() {
        Listing toAdd = knownGoodListing(ListingType.MERCHANDISE);

        service.add(toAdd).getMessages().forEach(System.out::println);

        assertTrue(service.add(toAdd).isSuccess());
        assertEquals(ResultType.SUCCESS, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNull() {
        assertFalse(service.add(null).isSuccess());
        assertEquals(ResultType.INVALID, service.add(null).getType());
    }

    @Test
    void shouldNotAddNullName() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setName(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNullPrice() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setPrice(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNegativePrice() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setPrice(BigDecimal.valueOf(-1.00));
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNegativeQuantity() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setQuantity(-1);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNoType() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setListingType(null);
        toAdd.setGame(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNoGameGame() {
        Listing toAdd = knownGoodListing(ListingType.GAME);
        toAdd.setGame(null);

        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNoConsoleConsole() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setConsole(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNoMerchMerch() {
        Listing toAdd = knownGoodListing(ListingType.MERCHANDISE);
        toAdd.setMerchandise(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddWrongDetailGame() {
        Listing toAdd = knownGoodListing(ListingType.GAME);
        toAdd.setGame(null);
        Merchandise merch = new Merchandise(1, "Test");
        toAdd.setMerchandise(merch);

        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddWrongDetailConsole() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setConsole(null);
        Merchandise merch = new Merchandise(1, "Test");
        toAdd.setMerchandise(merch);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddWrongDetailMerch() {
        Listing toAdd = knownGoodListing(ListingType.MERCHANDISE);
        toAdd.setMerchandise(null);
        Console console = new Console(1,"Test","ACME consoles",LocalDate.of(2022,10,12));
        toAdd.setConsole(console);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddMultiDetailGame() {
        Listing toAdd = knownGoodListing(ListingType.GAME);
        Merchandise merch = new Merchandise(1, "Test");
        toAdd.setMerchandise(merch);

        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddMultiDetailConsole() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        Merchandise merch = new Merchandise(1, "Test");
        toAdd.setMerchandise(merch);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddMultiDetailMerch() {
        Listing toAdd = knownGoodListing(ListingType.MERCHANDISE);
        Console console = new Console(1,"Test","ACME consoles",LocalDate.of(2022,10,12));
        toAdd.setConsole(console);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNullImagePath() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setImagePath(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddGameReferencingBadConsole() {
        Listing toAdd = knownGoodListing(ListingType.GAME);

        List<Integer> ec = new ArrayList<>();
        ec.add(2); // key to this test
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddWithId() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setId(1);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddEmptyGame() {
        Listing toAdd = knownGoodListing(ListingType.GAME);
        toAdd.setGame(new Game());
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddEmptyConsole() {
        Listing toAdd = knownGoodListing(ListingType.CONSOLE);
        toAdd.setConsole(new Console());
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddEmptyMerch() {
        Listing toAdd = knownGoodListing(ListingType.MERCHANDISE);
        toAdd.setMerchandise(new Merchandise());
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldUpdateGame() {
        Listing toUpdate = knownGoodListing(ListingType.GAME);
        toUpdate.setId(1);
        toUpdate.setName("UPDATED");

        when(repo.update(toUpdate)).thenReturn(true);

        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertTrue(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.SUCCESS, service.update(toUpdate).getType());
    }

    @Test
    void shouldUpdateConsole() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setId(1);
        toUpdate.setName("UPDATED");

        when(repo.update(toUpdate)).thenReturn(true);

        assertTrue(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.SUCCESS, service.update(toUpdate).getType());
    }

    @Test
    void shouldUpdateMerch() {
        Listing toUpdate = knownGoodListing(ListingType.MERCHANDISE);
        toUpdate.setId(1);
        toUpdate.setName("UPDATED");

        when(repo.update(toUpdate)).thenReturn(true);

        assertTrue(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.SUCCESS, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNull() {
        assertFalse(service.update(null).isSuccess());
        assertEquals(ResultType.INVALID, service.update(null).getType());
    }

    @Test
    void shouldNotUpdateNullName() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setName(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNullPrice() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setPrice(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNegativePrice() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setPrice(BigDecimal.valueOf(-1.00));

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNegativeQuantity() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setQuantity(-1);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNoType() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setListingType(null);
        toUpdate.setGame(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNoGameGame() {
        Listing toUpdate = knownGoodListing(ListingType.GAME);
        toUpdate.setGame(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);


        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNoConsoleConsole() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setConsole(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNoMerchMerch() {
        Listing toUpdate = knownGoodListing(ListingType.MERCHANDISE);
        toUpdate.setMerchandise(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWrongDetailGame() {
        Listing toUpdate = knownGoodListing(ListingType.GAME);
        toUpdate.setGame(null);
        Merchandise merch = new Merchandise(1, "Test");
        toUpdate.setMerchandise(merch);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);


        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdatedWrongDetailConsole() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setConsole(null);
        Merchandise merch = new Merchandise(1, "Test");
        toUpdate.setMerchandise(merch);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWrongDetailMerch() {
        Listing toUpdate = knownGoodListing(ListingType.MERCHANDISE);
        toUpdate.setMerchandise(null);
        Console console = new Console(1,"Test","ACME consoles",LocalDate.of(2022,10,12));
        toUpdate.setConsole(console);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateMultiDetailGame() {
        Listing toUpdate = knownGoodListing(ListingType.GAME);
        Merchandise merch = new Merchandise(1, "Test");
        toUpdate.setMerchandise(merch);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);


        List<Integer> ec = new ArrayList<>();
        ec.add(1);
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateMultiDetailConsole() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        Merchandise merch = new Merchandise(1, "Test");
        toUpdate.setMerchandise(merch);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateMultiDetailMerch() {
        Listing toUpdate = knownGoodListing(ListingType.MERCHANDISE);
        Console console = new Console(1,"Test","ACME consoles",LocalDate.of(2022,10,12));
        toUpdate.setConsole(console);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNullImagePath() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setImagePath(null);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateGameReferencingBadConsole() {
        Listing toUpdate = knownGoodListing(ListingType.GAME);

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);


        List<Integer> ec = new ArrayList<>();
        ec.add(2); // key to this test
        when(consoleRepo.getAvailableConsoleIds()).thenReturn(ec);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNullId() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        when(repo.update(toUpdate)).thenReturn(false);
        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateBadId() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setId(-1);
        when(repo.update(toUpdate)).thenReturn(false);
        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateEmptyGame() {
        Listing toUpdate = knownGoodListing(ListingType.GAME);
        toUpdate.setGame(new Game());

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateEmptyConsole() {
        Listing toUpdate = knownGoodListing(ListingType.CONSOLE);
        toUpdate.setConsole(new Console());

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateEmptyMerch() {
        Listing toUpdate = knownGoodListing(ListingType.MERCHANDISE);
        toUpdate.setMerchandise(new Merchandise());

        toUpdate.setId(1);
        when(repo.update(toUpdate)).thenReturn(true);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldDelete() {
        when(repo.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDelete() {
        when(repo.deleteById(9000)).thenReturn(false);
        assertFalse(service.deleteById(9000));
    }
}