package pw.react.backend.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pw.react.backend.model.ParkingSpot;
import pw.react.backend.model.ParkingSpotPhoto;

import java.util.Collection;

@Repository
public interface ParkingSpotRepository extends JpaRepository<ParkingSpot, Long> {
}
