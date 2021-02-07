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
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import pw.react.backend.appException.ResourceNotFoundException;
import pw.react.backend.dao.BookingRepository;
import pw.react.backend.dao.ParkingSpotPhotoRepository;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.model.Booking;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.service.BookingService;
import pw.react.backend.service.ParkingSpotService;
import pw.react.backend.service.PhotoService;
import pw.react.backend.utils.AuthFilter;
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
    private AuthFilter filter;


    @Autowired
    public BookingController(BookingRepository repository,
                             ParkingSpotRepository parkingSpotRepository,
                             BookingService bookingService, UserRepository userRepository){
        this.repository = repository;
        this.bookingService = bookingService;
        this.parkingSpotRepository = parkingSpotRepository;
        this.filter = new AuthFilter(userRepository);
    }
    @PostMapping(path = "")
    public ResponseEntity<Long> createBooking(@RequestBody Booking booking, @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var parkingSpot = parkingSpotRepository.findById(booking.getItemId());
        if(parkingSpot.isEmpty()){
            return ResponseEntity.ok((long)-1);
        }
        booking.setItemType("ParkingSpot");
        booking.setItem(parkingSpot.get());
        var result = repository.save(booking);
        return ResponseEntity.ok(result.getId());
    }
    @GetMapping(path = "/{bookingId}")
    public ResponseEntity<Booking> getBooking(@PathVariable Long bookingId, @RequestHeader(required = false, value = "security-header") String token)
    {
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        return ResponseEntity.ok(repository.findById(bookingId).orElseGet(() -> Booking.EMPTY));
    }
    @GetMapping(path = "")
    public ResponseEntity<PagedResponse<Collection<Booking>>> getAllBookings(@RequestParam(required = false) @DateTimeFormat(pattern= pw.react.backend.utils.DateTimeFormat.DATE_FORMAT) Date from,
                                                              @RequestParam(required = false) @DateTimeFormat(pattern= pw.react.backend.utils.DateTimeFormat.DATE_FORMAT) Date to,
                                                              @RequestParam(defaultValue = "true") boolean sortAscending,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size,
                                                                             @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

            Pageable paging = PageRequest.of(page, size, sortAscending? Sort.by("startDateTime").ascending() :  Sort.by("startDateTime").descending());
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
                                                         @RequestBody Booking updatedBooking, @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var result = bookingService.updateBooking(bookingId, updatedBooking);
        if(Booking.EMPTY.equals(result)){
            return ResponseEntity.badRequest().body(updatedBooking);
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable long bookingId,
                                                    @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var booking = repository.findById(bookingId);
        if(booking.isPresent() == false)
            throw new ResourceNotFoundException("not found");
        repository.deleteById(bookingId);
        return ResponseEntity.ok(String.format("Item with id %s deleted.", booking.get().getId()));
    }
}