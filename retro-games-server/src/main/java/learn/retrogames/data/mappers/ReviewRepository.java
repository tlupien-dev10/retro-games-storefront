package learn.retrogames.data.mappers;

import learn.retrogames.models.Review;
import org.springframework.transaction.annotation.Transactional;

public interface ReviewRepository {
    Review add(Review review);

    boolean update(Review review);

    @Transactional
    boolean deleteById(int id);
}
