package learn.retrogames.data;

import learn.retrogames.models.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ListingJdbcTemplateRepositoryTest {

    final static int NEXT_ID = 13;

    @Autowired
    ListingJdbcTemplateRepository listingJdbcTemplateRepository;

    @Autowired
    KnownGoodState knownGoodState;


    @BeforeEach
    void setUp(){
        knownGoodState.set();
    }


    @Test
    void shouldFindAll(){
        List<Listing> listings = listingJdbcTemplateRepository.getAll();
        BigDecimal cost = new BigDecimal("29.99");

        assertNotNull(listings);
        assertEquals(listings.size(), 13);

        assertEquals(listings.get(1).getListingType(), ListingType.GAME);
        System.out.println(listings.get(12).getPrice());
        assertEquals(listings.get(12).getPrice(), cost);
        assertNull(listings.get(3).getConsole());

    }

    @Test
    void shouldFindById(){
        Listing listing1 = listingJdbcTemplateRepository.getById(1);
        assertEquals(listing1.getListingType(), ListingType.GAME);
        assertEquals(listing1.getPrice(), new BigDecimal("69.99"));
    }

    @Test
    void shouldNotFindInvalidListing(){
        assertNull(listingJdbcTemplateRepository.getById(-5));
    }

    @Test
    void shouldAddGameListing(){
        Listing toAdd = new Listing();
        toAdd.setName("Spooky Scary Skeletons");
        toAdd.setPrice(new BigDecimal(19.99f));
        toAdd.setDescription("scary game");
        toAdd.setListingType(ListingType.GAME);
        toAdd.setQuantity(5);
        toAdd.setImagePath("./ImageTest/999");

        Game toJoin = new Game();
        toJoin.setGenre("Platformer");
        toJoin.setPublisher("Sony");
        toJoin.setReleaseDate(LocalDate.of(1999, 5, 27));


        List<Console> consoles = new ArrayList<>();
        Console detailConsole = new Console();
        detailConsole.setCompany("Sony");
        detailConsole.setVersion("1st Generation");
        detailConsole.setReleaseDate(LocalDate.of(1994, 12, 3));
        detailConsole.setId(9);

        toJoin.setConsoles(consoles);

        toAdd.setGame(toJoin);
        Listing actual = listingJdbcTemplateRepository.add(toAdd);

        assertNotNull(actual);
        assertTrue(actual.getId() >= 14 && actual.getId() <= 16);
    }

    @Test
    void shouldAddConsoleListing(){
        Listing toAdd = new Listing();
        toAdd.setName("PlayStation 2");
        toAdd.setPrice(new BigDecimal(19.99f));
        toAdd.setDescription("speaks for itself");
        toAdd.setListingType(ListingType.CONSOLE);
        toAdd.setQuantity(4);
        toAdd.setImagePath("./ImageTest/999");

        Console toJoin = new Console();
        toJoin.setCompany("Sony");
        toJoin.setVersion("2nd Generation");
        toJoin.setReleaseDate(LocalDate.of(1999, 5, 27));
        toJoin.setId(5);


        toAdd.setConsole(toJoin);
        Listing actual = listingJdbcTemplateRepository.add(toAdd);

        assertNotNull(actual);
        assertTrue(actual.getId() >= 14 && actual.getId() <= 16);
    }

    @Test
    void shouldAddMerchandiseListing(){
        Listing toAdd = new Listing();
        toAdd.setName("Mario merch");
        toAdd.setPrice(new BigDecimal(19.99f));
        toAdd.setDescription("fleece blanket");
        toAdd.setListingType(ListingType.MERCHANDISE);
        toAdd.setQuantity(4);
        toAdd.setImagePath("./ImageTest/999");

        Merchandise toJoin = new Merchandise();
        toJoin.setCategory("Blanket");
        toJoin.setId(6);

        toAdd.setMerchandise(toJoin);
        Listing actual = listingJdbcTemplateRepository.add(toAdd);
        assertNotNull(actual);
        assertTrue(actual.getId() >= 14 && actual.getId() <= 16 );
    }

    @Test
    void shouldUpdateGameListing(){
        Listing toUpdate = new Listing();
        toUpdate.setName("Spooky Scary Skeletons");
        toUpdate.setPrice(new BigDecimal(19.99f));
        toUpdate.setDescription("scary game");
        toUpdate.setListingType(ListingType.GAME);
        toUpdate.setQuantity(5);
        toUpdate.setImagePath("./ImageTest/999");

        Game toJoin = new Game();
        toJoin.setGenre("Platformer");
        toJoin.setPublisher("Sony");
        toJoin.setReleaseDate(LocalDate.of(1999, 5, 27));
        toJoin.setId(listingJdbcTemplateRepository.getById(2).getGame().getId());


        List<Console> consoles = new ArrayList<>();
        Console detailConsole = new Console();
        detailConsole.setId(5);
        consoles.add(detailConsole);

        toJoin.setConsoles(consoles);

        toUpdate.setGame(toJoin);
        toUpdate.setId(2);
        assertTrue(listingJdbcTemplateRepository.update(toUpdate));
        Listing updatedListing = listingJdbcTemplateRepository.getById(2);
        assertEquals("Sony", updatedListing.getGame().getPublisher());
        assertEquals("scary game", updatedListing.getDescription());

    }

    @Test
    void shouldUpdateGameConsoleListing(){
        Listing toUpdate = new Listing();
        toUpdate.setName("Spooky Scary Skeletons");
        toUpdate.setPrice(new BigDecimal(19.99f));
        toUpdate.setDescription("scary game");
        toUpdate.setListingType(ListingType.GAME);
        toUpdate.setQuantity(5);
        toUpdate.setImagePath("./ImageTest/999");

        Game toJoin = new Game();
        toJoin.setGenre("Platformer");
        toJoin.setPublisher("Sony");
        toJoin.setReleaseDate(LocalDate.of(1999, 5, 27));
        toJoin.setId(listingJdbcTemplateRepository.getById(2).getGame().getId());


        List<Console> consoles = new ArrayList<>();
        Console detailConsole = new Console();
        detailConsole.setId(2);
        consoles.add(detailConsole);

        toJoin.setConsoles(consoles);

        toUpdate.setGame(toJoin);
        toUpdate.setId(2);
        assertTrue(listingJdbcTemplateRepository.update(toUpdate));
        Listing updatedListing = listingJdbcTemplateRepository.getById(2);
        assertEquals("Sony", updatedListing.getGame().getPublisher());
        assertEquals("scary game", updatedListing.getDescription());
        assertEquals(2, updatedListing.getGame().getConsoles().get(0).getId());
    }

    @Test
    void shouldUpdateConsoleListing() {
        
    }

    @Test
    void shouldUpdateMerchandise(){

    }

    @Test
    void shouldDeleteGameListing(){
        assertTrue(listingJdbcTemplateRepository.deleteById(1));
    }

    @Test
    void shouldDeleteConsoleListing(){
        assertTrue(listingJdbcTemplateRepository.deleteById(7));
    }

    @Test
    void shouldDeleteMerchandiseListing(){
        assertTrue(listingJdbcTemplateRepository.deleteById(12));
    }


}