package pw.react.backend.controller;

import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pw.react.backend.appException.ResourceNotFoundException;
import pw.react.backend.dao.ParkingSpotPhotoRepository;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.model.ParkingSpotPhoto;
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
                                 ParkingSpotPhotoRepository photoRepository,
                                 ParkingSpotService parkingSpotService,
                                 PhotoService photoService){
        this.repository = repository;
        this.parkingSpotService = parkingSpotService;
        this.photoService = photoService;
        this.photoRepository = photoRepository;
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
    @GetMapping("/{parkingSpotId}/photos/{photoName}")
    public ResponseEntity<Resource> getPhoto(@PathVariable Long parkingSpotId, @PathVariable String photoName){
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
                                                         @RequestParam("image") MultipartFile image){
        var photo = photoService.storePhoto(parkingSpotId, image);

        String fileDownloadUri = buildDownloadUri(photo);
        return ResponseEntity.ok(new UploadFileResponse(
                photo.getFileName(), fileDownloadUri, image.getContentType(), image.getSize()
        ));
    }

    @GetMapping(value = "/{parkingSpotId}/photos")
    public ResponseEntity<Collection<UploadFileResponse>> getPhotos(@PathVariable Long parkingSpotId){
        var photos = photoService.getParkingSpotPhotos(parkingSpotId);

        return ResponseEntity.ok(photos.stream().map(p ->
            new UploadFileResponse(
                    p.getFileName(), buildDownloadUri(p), p.getFileType(), p.getSize()
            )
        ).collect(Collectors.toList()));
    }
    @DeleteMapping("/{parkingSpotId}/photos/{photoName}")
    public ResponseEntity<String> deletePhoto(@PathVariable long parkingSpotId, @PathVariable String photoName){
        var photos = photoRepository.findByParkingSpotId(parkingSpotId);
        var photo = photos.stream().filter(x -> x.getFileName().equals(photoName)).findFirst();

        if(photo.isPresent() == false)
            throw new ResourceNotFoundException("not found");

        photoRepository.deleteById(photo.get().getId());
        return ResponseEntity.ok(String.format("Photo with id %s deleted.", photo.get().getId()));
    }
}
