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

import pw.react.backend.dao.ParkingSpotPhotoRepository;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.service.ParkingSpotService;
import pw.react.backend.service.PhotoService;
import pw.react.backend.web.UploadFileResponse;

import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/parkingSpots")
public class ParkingSpotController {
    private final Logger logger = LoggerFactory.getLogger(ParkingSpotController.class);
    private ParkingSpotRepository repository;
    private ParkingSpotPhotoRepository photoRepository;
    private ParkingSpotService parkingSpotService;
    private PhotoService photoService;

    @Autowired
    public ParkingSpotController(ParkingSpotRepository repository,
                                 ParkingSpotService parkingSpotService,
                                 PhotoService photoService){
        this.repository = repository;
        this.parkingSpotService = parkingSpotService;
        this.photoService = photoService;
    }
    @PostMapping(path = "")
    public ResponseEntity<Long> createParkingSpot(@RequestBody ParkingSpot parkingSpot){
        var result = repository.save(parkingSpot);
        return ResponseEntity.ok(result.getId());
    }
    @GetMapping(path = "/{parkingSpotId}")
    public ResponseEntity<ParkingSpot> getParkingSpot(@PathVariable Long parkingSpotId)
    {
        return ResponseEntity.ok(repository.findById(parkingSpotId).orElseGet(() -> ParkingSpot.EMPTY));
    }
    @GetMapping(path = "")
    public ResponseEntity<Collection<ParkingSpot>> getAllParkingSpots(){
        return ResponseEntity.ok(repository.findAll());
    }
    @PutMapping(path = "/{parkingSpotId}")
    public ResponseEntity<ParkingSpot> updateParkingSpot(@PathVariable Long parkingSpotId,
                                                         @RequestBody ParkingSpot updatedParkingSpot){
        var result = parkingSpotService.updateParkingSpot(parkingSpotId, updatedParkingSpot);
        if(ParkingSpot.EMPTY.equals(result)){
            return ResponseEntity.badRequest().body(updatedParkingSpot);
        }
        return ResponseEntity.ok(result);
    }
    @PostMapping("/{parkingSpotId}/photos")
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
}
