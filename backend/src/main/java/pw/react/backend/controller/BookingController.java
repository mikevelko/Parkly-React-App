package pw.react.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
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
import pw.react.backend.utils.PagedResponse;
import pw.react.backend.web.UploadFileResponse;

import java.awt.print.Book;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/bookings")
public class BookingController {
    private final Logger logger = LoggerFactory.getLogger(BookingController.class);
    private BookingRepository repository;
    private ParkingSpotRepository parkingSpotRepository;
    private BookingService bookingService;


    @Autowired
    public BookingController(BookingRepository repository,
                             ParkingSpotRepository parkingSpotRepository,
                             BookingService bookingService){
        this.repository = repository;
        this.bookingService = bookingService;
        this.parkingSpotRepository = parkingSpotRepository;
    }
    @PostMapping(path = "")
    public ResponseEntity<Long> createBooking(@RequestBody Booking booking){
        var parkingSpot = parkingSpotRepository.findById(booking.getParkingSpotId());
        if(parkingSpot.isEmpty()){
            return ResponseEntity.ok((long)-1);
        }
        booking.setParkingSpot(parkingSpot.get());
        var result = repository.save(booking);
        return ResponseEntity.ok(result.getId());
    }
    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long bookingId)
    {
        return ResponseEntity.ok(repository.findById(bookingId).orElseGet(() -> Booking.EMPTY));
    }
    @GetMapping(path = "")
    public ResponseEntity<PagedResponse<Collection<Booking>>> getAllBookings(@RequestParam(required = false) @DateTimeFormat(pattern=Booking.DATE_FORMAT) Date from,
                                                              @RequestParam(required = false) @DateTimeFormat(pattern=Booking.DATE_FORMAT) Date to,
                                                              @RequestParam(defaultValue = "true") boolean sortAscending,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size){

            Pageable paging = PageRequest.of(page, size, sortAscending? Sort.by("startDateTime").ascending() : Sort.by("startDateTime").descending());
            Page<Booking> pageResult;

            if(from != null && to != null) {
                LocalDateTime fromLocal = from.toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();

                LocalDateTime toLocal = to.toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDateTime();
                pageResult = repository.findByStartDateTimeGreaterThanEqualAndEndDateTimeLessThanEqual(fromLocal, toLocal, paging);
            } else{
                pageResult = repository.findAll(paging);
            }
            PagedResponse<Collection<Booking>> response =
                    new PagedResponse<>(pageResult.getContent(),page, size, pageResult.getTotalPages());
            return ResponseEntity.ok(response);
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

}