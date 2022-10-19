package learn.retrogames.data;

import learn.retrogames.models.AppUser;
import learn.retrogames.models.Review;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ReviewJdbcTemplateRepositoryTest {

    @Autowired
    ReviewJdbcTemplateRepository reviewJdbcTemplateRepository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setUp(){
        knownGoodState.set();
    }

    private Review makeReview(){
        Review review = new Review();
        review.setUsername("sally@jones.com");
        review.setDescription("Coolio");
        review.setRating(3);
        review.setListing(14);
        review.setTitle("Alright");
        return review;
    }

    @Test
    void shouldAddReview(){
        Review toAdd = makeReview();
        Review addedWithId = reviewJdbcTemplateRepository.add(toAdd);
        assertNotEquals(null, addedWithId);
        assertEquals(20, addedWithId.getId());
    }

    @Test
    void shouldUpdateReview(){
        Review toUpdate = makeReview();
        Review addedWithId = reviewJdbcTemplateRepository.add(toUpdate);
        assertEquals(20, addedWithId.getId());

        toUpdate.setId(20);
        toUpdate.setRating(5);
        assertTrue(reviewJdbcTemplateRepository.update(toUpdate));

    }

    @Test
    void shouldDeleteById(){
        assertTrue(reviewJdbcTemplateRepository.deleteById(7));
    }
}
