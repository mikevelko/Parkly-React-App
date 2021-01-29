package pw.react.backend.dao;

import org.hibernate.annotations.CollectionId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.model.ParkingSpotPhoto;

import java.util.Collection;

@Repository
public interface ParkingSpotPhotoRepository extends JpaRepository<ParkingSpotPhoto, String> {
    @Query("FROM ParkingSpotPhoto WHERE parkingSpotId = ?1")
    Collection<ParkingSpotPhoto> findByParkingSpotId(long parkingSpotId);
    @Query("FROM ParkingSpotPhoto WHERE parkingSpotId = ?1")
    void deleteByParkingSpotId(long parkingSpotId);
}

