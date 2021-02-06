package pw.react.backend.controller;

import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pw.react.backend.appException.ResourceNotFoundException;
import pw.react.backend.dao.ParkingSpotPhotoRepository;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.dao.UserRepository;
import pw.react.backend.model.Booking;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.model.ParkingSpotPhoto;
import pw.react.backend.service.ParkingSpotService;
import pw.react.backend.service.PhotoService;
import pw.react.backend.utils.AuthFilter;
import pw.react.backend.utils.PagedResponse;
import pw.react.backend.web.UploadFileResponse;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@RestController
@RequestMapping(path = "/parkingSpots")
public class ParkingSpotController {
    private final Logger logger = LoggerFactory.getLogger(ParkingSpotController.class);
    private ParkingSpotRepository repository;
    private ParkingSpotPhotoRepository photoRepository;
    private ParkingSpotService parkingSpotService;
    private PhotoService photoService;
    private AuthFilter filter;

    @Autowired
    public ParkingSpotController(ParkingSpotRepository repository,
                                 ParkingSpotPhotoRepository photoRepository,
                                 ParkingSpotService parkingSpotService,
                                 PhotoService photoService,
                                 UserRepository userRepository){
        this.repository = repository;
        this.parkingSpotService = parkingSpotService;
        this.photoService = photoService;
        this.photoRepository = photoRepository;
        this.filter = new AuthFilter(userRepository);
    }
    @PostMapping(path = "")
    public ResponseEntity<Long> createParkingSpot(@RequestBody ParkingSpot parkingSpot,
                                                  @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var result = repository.save(parkingSpot);
        return ResponseEntity.ok(result.getId());
    }
    @GetMapping(path = "/{parkingSpotId}")
    public ResponseEntity<ParkingSpot> getParkingSpot(@PathVariable Long parkingSpotId, @RequestHeader(required = false, value = "security-header") String token)
    {
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        return ResponseEntity.ok(repository.findById(parkingSpotId).orElseGet(() -> ParkingSpot.EMPTY));
    }
    @GetMapping(path = "")
    public ResponseEntity<PagedResponse<Collection<ParkingSpot>>> getAllParkingSpots(@RequestParam(required = false) String name,
                                                                      @RequestParam(required = false) Boolean booked,
                                                                      @RequestParam(defaultValue = "true") boolean sortAscending,
                                                                      @RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size,
                                                                                     @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        Pageable paging = PageRequest.of(page, size, sortAscending? Sort.by("name").ascending() : Sort.by("name").descending());
        Page<ParkingSpot> pageResult;
        if(name != null && booked != null){
            pageResult = repository.findByBookedAndNameContaining(booked, name, paging);
        }else if(name != null){
            pageResult = repository.findByNameContaining(name, paging);
        }else if(booked != null){
            pageResult = repository.findByBooked(booked, paging);
        }else{
            pageResult = repository.findAll(paging);
        }

        PagedResponse<Collection<ParkingSpot>> response =
                new PagedResponse<>(pageResult.getContent(),page, size, pageResult.getTotalPages());
        for(ParkingSpot spot : response.getData()) {
            spot.setBookings(new ArrayList<Booking>());
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping(path = "/bookedCount")
    public ResponseEntity<Integer> getBookedCount(@RequestParam boolean booked, @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        return ResponseEntity.ok(repository.countByBooked(booked));
    }

    @PutMapping(path = "/{parkingSpotId}")
    public ResponseEntity<ParkingSpot> updateParkingSpot(@PathVariable Long parkingSpotId,
                                                         @RequestBody ParkingSpot updatedParkingSpot,
                                                         @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var result = parkingSpotService.updateParkingSpot(parkingSpotId, updatedParkingSpot);
        if(ParkingSpot.EMPTY.equals(result)){
            return ResponseEntity.badRequest().body(updatedParkingSpot);
        }
        return ResponseEntity.ok(result);
    }
    @GetMapping("/{parkingSpotId}/photos/{photoName}")
    public ResponseEntity<Resource> getPhoto(@PathVariable Long parkingSpotId, @PathVariable String photoName,
                                             @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var photos = photoRepository.findByParkingSpotId(parkingSpotId);
        var photo = photos.stream().filter(x -> x.getFileName().equals(photoName)).findFirst();
        if(photo.isPresent() == false)
            throw new ResourceNotFoundException("not found");

        var data = photo.get().getData();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(photo.get().getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.get().getFileName() + "\"")
                .body(new ByteArrayResource(data));
    }
//TODO: przeniesc do serwisu jakiegos
    private String buildDownloadUri(ParkingSpotPhoto photo){
        return  ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/parkingSpots/" + photo.getParkingSpotId() + "/photos/")
                .path(photo.getFileName())
                .toUriString();
    }

    @PostMapping("/{parkingSpotId}/photos")
    public ResponseEntity<UploadFileResponse> uploadPhoto(@PathVariable Long parkingSpotId,
                                                         @RequestParam("image") MultipartFile image,
                                                          @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var photo = photoService.storePhoto(parkingSpotId, image);
        String fileDownloadUri = buildDownloadUri(photo);
        return ResponseEntity.ok(new UploadFileResponse(
                photo.getFileName(), fileDownloadUri, image.getContentType(), image.getSize()
        ));
    }

    @GetMapping(value = "/{parkingSpotId}/photos")
    public ResponseEntity<Collection<UploadFileResponse>> getPhotos(@PathVariable Long parkingSpotId,
                                                                    @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var photos = photoService.getParkingSpotPhotos(parkingSpotId);

        return ResponseEntity.ok(photos.stream().map(p ->
            new UploadFileResponse(
                    p.getFileName(), buildDownloadUri(p), p.getFileType(), p.getSize()
            )
        ).collect(Collectors.toList()));
    }
    @DeleteMapping("/{parkingSpotId}/photos/{photoName}")
    public ResponseEntity<String> deletePhoto(@PathVariable long parkingSpotId, @PathVariable String photoName,
                                              @RequestHeader(required = false, value = "security-header") String token){
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        var photos = photoRepository.findByParkingSpotId(parkingSpotId);
        var photo = photos.stream().filter(x -> x.getFileName().equals(photoName)).findFirst();

        if(photo.isPresent() == false)
            throw new ResourceNotFoundException("not found");

        photoRepository.deleteById(photo.get().getId());
        return ResponseEntity.ok(String.format("Photo with id %s deleted.", photo.get().getId()));
    }
    @GetMapping(path = "/{parkingSpotId}/bookings")
    public ResponseEntity<Collection<Booking>> getParkingSpotBookings(@PathVariable Long parkingSpotId,
                                                                      @RequestHeader(required = false, value = "security-header") String token)
    {
        if(filter.IsInvalidToken(token)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);

        ParkingSpot spot = repository.findById(parkingSpotId).orElseGet(() -> null);
        if(spot != null){
            return ResponseEntity.ok(spot.getBookings());
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
