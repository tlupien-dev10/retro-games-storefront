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

}