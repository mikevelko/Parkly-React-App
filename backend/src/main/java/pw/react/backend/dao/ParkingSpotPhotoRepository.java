package pw.react.backend.dao;

import org.hibernate.annotations.CollectionId;
import org.springframework.data.jpa.repository.JpaRepository;
import pw.react.backend.model.ParkingSpotPhoto;

import java.util.Collection;

public interface ParkingSpotPhotoRepository extends JpaRepository<ParkingSpotPhoto, String> {
    Collection<ParkingSpotPhoto> findByParkingSpotId(long parkingSpotId);
    void deleteByParkingSpotId(long parkingSpotId);
}
