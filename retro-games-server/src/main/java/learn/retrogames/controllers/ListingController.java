package learn.retrogames.controllers;

import learn.retrogames.domain.ListingService;
import learn.retrogames.domain.Result;
import learn.retrogames.models.Listing;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/listing")
public class ListingController {
    private final ListingService service;

    public ListingController(ListingService service) {
        this.service = service;
    }

    @GetMapping
    public List<Listing> getAll() {
        return service.getAll();
    }

    @GetMapping("/{listingId}")
    public Listing getById(@PathVariable int listingId){
        return service.getById(listingId);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Listing listing){
        Result<Listing> result = service.add(listing);
        if(result.isSuccess()){
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @PutMapping("/{listingId}")
    public ResponseEntity<Object> update(@PathVariable int listingId, @RequestBody Listing listing){
        if (listingId != listing.getId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Listing> result = service.update(listing);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{listingId}")
    public ResponseEntity<Void> deleteById(@PathVariable int listingId) {
        if (service.deleteById(listingId)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
