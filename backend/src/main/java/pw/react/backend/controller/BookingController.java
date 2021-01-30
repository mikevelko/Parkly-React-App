package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pw.react.backend.dao.BookingRepository;
import pw.react.backend.dao.ParkingSpotPhotoRepository;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.model.Booking;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.service.BookingService;
import pw.react.backend.service.ParkingSpotService;
import pw.react.backend.service.PhotoService;
import pw.react.backend.web.UploadFileResponse;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/bookings")
public class BookingController {
    private final Logger logger = LoggerFactory.getLogger(BookingController.class);
    private BookingRepository repository;
    private BookingService bookingService;


    @Autowired
    public BookingController(BookingRepository repository,
                                 BookingService bookingService){
        this.repository = repository;
        this.bookingService = bookingService;
    }
    @PostMapping(path = "")
    public ResponseEntity<Long> createBooking(@RequestBody Booking booking){
        var result = repository.save(booking);
        return ResponseEntity.ok(result.getId());
    }
    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long bookingId)
    {
        return ResponseEntity.ok(repository.findById(bookingId).orElseGet(() -> Booking.EMPTY));
    }
    @GetMapping(path = "")
    public ResponseEntity<Collection<Booking>> getAllBookings(){
        return ResponseEntity.ok(repository.findAll());
    }
    @PutMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long bookingId,
                                                         @RequestBody Booking updatedBooking){
        var result = bookingService.updateBooking(bookingId, updatedBooking);
        if(Booking.EMPTY.equals(result)){
            return ResponseEntity.badRequest().body(updatedBooking);
        }
        return ResponseEntity.ok(result);
    }
    /* @PostMapping("/{parkingSpotId}/photos")
    public ResponseEntity<UploadFileResponse> uploadPhoto(@PathVariable Long parkingSpotId,
                                                          @RequestParam("file") MultipartFile file){
        var photo = photoService.storePhoto(parkingSpotId, file);

        return ResponseEntity.ok(new UploadFileResponse());
    }
    @GetMapping(value = "/{parkingSpotId}/photos")
    public ResponseEntity<Collection<byte[]>> getPhotos(@PathVariable Long parkingSpotId){
        var photos = photoService.getParkingSpotPhotos(parkingSpotId);
        return ResponseEntity.ok(photos.stream().map(p -> p.getData()).collect(Collectors.toList()));
    }
    @DeleteMapping(value = "/{parkingSpotId}/photos/{photoId}")
    public ResponseEntity<String> deletePhoto(@PathVariable String photoId){
        photoRepository.deleteById(photoId);
        return ResponseEntity.ok(String.format("Photo with id %s deleted.", photoId));
    }
     */
}