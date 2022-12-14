package learn.retrogames.controllers;

import learn.retrogames.domain.ReviewService;
import learn.retrogames.domain.Result;
import learn.retrogames.domain.ReviewService;
import learn.retrogames.models.Review;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService service;

    public ReviewController(ReviewService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Review review){
        Result<Review> result = service.add(review);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> update(@PathVariable int reviewId, @RequestBody Review review){
        if (reviewId != review.getId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Review> result = service.update(review);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteById(@PathVariable int reviewId) {
        if (service.deleteById(reviewId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}
