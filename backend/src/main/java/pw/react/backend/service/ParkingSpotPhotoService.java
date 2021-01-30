package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import pw.react.backend.appException.InvalidFileException;
import pw.react.backend.appException.ResourceNotFoundException;
import pw.react.backend.dao.ParkingSpotPhotoRepository;
import pw.react.backend.model.ParkingSpotPhoto;

import java.io.IOException;
import java.util.Collection;
import java.util.Objects;
import java.util.UUID;

@Service
class ParkingSpotPhotoService implements PhotoService {

    private final Logger logger = LoggerFactory.getLogger(ParkingSpotPhotoService.class);

    private final ParkingSpotPhotoRepository repository;

    @Autowired
    public ParkingSpotPhotoService(ParkingSpotPhotoRepository repository) {
        this.repository = repository;
    }

    @Override
    public ParkingSpotPhoto storePhoto(long parkingSpotId, MultipartFile file) {
        if (file == null) {
            throw new InvalidFileException("Attachment [MultipartFile] is null.");
        }
        String fileName = UUID.randomUUID().toString();
        try {

            var parkingSpotPhoto = new ParkingSpotPhoto(fileName,
                    file.getContentType(),
                    parkingSpotId,
                    file.getBytes(),
                    file.getSize());

            return repository.save(parkingSpotPhoto);
        } catch (IOException ex) {
            throw new InvalidFileException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public Collection<ParkingSpotPhoto> getParkingSpotPhotos(long parkingSpotId) {
        return repository.findByParkingSpotId(parkingSpotId);
    }

    @Override
    public void deleteParkingSpotPhotos(long parkingSpotId) {
        repository.deleteByParkingSpotId(parkingSpotId);
        logger.info("Photo for the parking spot with id {} deleted.", parkingSpotId);
    }
    @Override
    public boolean deleteParkingSpotPhoto(String photoId){
        boolean result = false;
        if (repository.existsById(photoId)) {
            repository.deleteById(photoId);
            logger.info("Photo with id {}s deleted.", photoId);
            result = true;
        }
        return result;
    }
}
