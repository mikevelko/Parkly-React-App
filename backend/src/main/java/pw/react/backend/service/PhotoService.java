package pw.react.backend.service;

import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.model.ParkingSpotPhoto;

import java.util.Collection;

public interface PhotoService {
    ParkingSpotPhoto storePhoto(long parkingSpotId, MultipartFile file);
    Collection<ParkingSpotPhoto> getParkingSpotPhotos(long parkingSpotId);
    void deleteParkingSpotPhotos(long parkingSpotId);
    boolean deleteParkingSpotPhoto(String photoId);
}
