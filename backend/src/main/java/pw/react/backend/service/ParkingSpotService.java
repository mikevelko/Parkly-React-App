package pw.react.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import pw.react.backend.dao.ParkingSpotRepository;
import pw.react.backend.model.ParkingSpot;

public interface ParkingSpotService {
    ParkingSpot updateParkingSpot(Long id, ParkingSpot updatedParkingSpot);
    boolean deleteParkingSpot(Long companyId);
}
