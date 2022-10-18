package learn.retrogames.domain;

import learn.retrogames.data.ReviewRepository;
import learn.retrogames.models.AppUser;
import learn.retrogames.models.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
public class ReviewServiceTest {

    @Autowired
    ReviewService service;

    @MockBean
    ReviewRepository repo;

    private Review makeKnownGoodReview(){
        Review review = new Review();
        AppUser reviewer = new AppUser(2, "sally@jones.com");
        review.setAuthor(reviewer);
        review.setAuthorId(2);
        review.setDescription("Coolio");
        review.setRating(3);
        review.setListing(14);
        review.setTitle("Alright");
        review.setId(0);
        return review;
    }

    @Test
    void shouldAddValidReview(){
        Review toAdd = makeKnownGoodReview();
        assertTrue(service.add(toAdd).isSuccess());
        assertEquals(ResultType.SUCCESS, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddNullReview(){
        assertFalse(service.add(null).isSuccess());
        assertEquals(ResultType.INVALID, service.add(null).getType());
    }

    @Test
    void shouldNotAddReviewWithoutTitle(){
        Review toAdd = makeKnownGoodReview();
        toAdd.setTitle(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddReviewWithoutDescription(){
        Review toAdd = makeKnownGoodReview();
        toAdd.setDescription(null);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddReviewWithoutAuthorId(){
        Review toAdd = makeKnownGoodReview();
        toAdd.setAuthorId(0);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddReviewWithoutValidRating(){
        Review toAdd = makeKnownGoodReview();
        toAdd.setRating(-1);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());

        Review toAdd2 = makeKnownGoodReview();
        toAdd2.setRating(7);
        assertFalse(service.add(toAdd2).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd2).getType());
    }

    @Test
    void shouldNotAddWithoutListingId(){
        Review toAdd = makeKnownGoodReview();
        toAdd.setListing(-5); //sets Id
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldNotAddWithReviewIdAlreadySet(){
        Review toAdd = makeKnownGoodReview();
        toAdd.setId(6);
        assertFalse(service.add(toAdd).isSuccess());
        assertEquals(ResultType.INVALID, service.add(toAdd).getType());
    }

    @Test
    void shouldUpdateReview(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setId(7);
        when(repo.update(toUpdate)).thenReturn(true);

        assertTrue(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.SUCCESS, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateNullReview(){
        assertFalse(service.update(null).isSuccess());
        assertEquals(ResultType.INVALID, service.update(null).getType());
    }

    @Test
    void shouldNotUpdateWithoutTitle(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setTitle(null);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWithoutDescription(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setDescription(null);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWithoutAuthorId(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setAuthorId(-5);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWithInvalidRating(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setRating(-5);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());

        Review toUpdate2 = makeKnownGoodReview();
        toUpdate2.setRating(7);

        assertFalse(service.update(toUpdate2).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate2).getType());
    }

    @Test
    void shouldNotUpdateWithoutListing() {
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setListing(0);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWithoutIdSet(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setDescription(null);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.INVALID, service.update(toUpdate).getType());
    }

    @Test
    void shouldNotUpdateWhenReviewNotFound(){
        Review toUpdate = makeKnownGoodReview();
        toUpdate.setId(99);
        when(repo.update(toUpdate)).thenReturn(false);

        assertFalse(service.update(toUpdate).isSuccess());
        assertEquals(ResultType.NOT_FOUND, service.update(toUpdate).getType());
    }

    @Test
    void shouldDeleteReview(){
        when(repo.deleteById(3)).thenReturn(true);
        assertTrue(service.deleteById(3));
    }

    @Test
    void shouldNotDeleteNonexistentReview(){
        when(repo.deleteById(9000)).thenReturn(false);
        assertFalse(service.deleteById(9000));

    }
}
